import React from 'react';

export type ApiErrorType = 'network' | 'auth' | 'rate_limit' | 'server' | 'validation' | 'timeout' | 'unknown';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  retryable: boolean;
  retryAfter?: number;
  details?: Record<string, unknown>;
}

export interface AppError {
  component: string;
  error: Error | ApiError;
  context?: Record<string, unknown>;
  timestamp: Date;
}

// 型ガード: statusプロパティを持つオブジェクト
interface ErrorWithStatus {
  status: number;
}

function hasStatus(error: unknown): error is ErrorWithStatus {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as ErrorWithStatus).status === 'number'
  );
}

// 型ガード: messageプロパティを持つオブジェクト
interface ErrorWithMessage {
  message: string;
}

function hasMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
}

/**
 * Standardized API error handling with user-friendly Japanese messages
 */
export const handleApiError = (error: unknown, context: string): ApiError => {
  // Handle fetch/network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: 'network',
      message: 'ネットワーク接続エラー。インターネット接続を確認してください。',
      retryable: true,
      details: { originalError: error.message }
    };
  }

  // Handle HTTP errors
  if (hasStatus(error)) {
    const status = error.status;

    switch (status) {
      case 401:
        return {
          type: 'auth',
          message: 'API認証エラー。設定を確認してください。',
          retryable: false
        };
      case 429:
        return {
          type: 'rate_limit',
          message: 'API使用制限に達しました。しばらく待ってから再試行してください。',
          retryable: true,
          retryAfter: 60
        };
      case 503:
        return {
          type: 'server',
          message: 'サーバーが一時的に利用できません。しばらく待ってから再試行してください。',
          retryable: true,
          retryAfter: 30
        };
      default:
        return {
          type: 'server',
          message: `サーバーエラー（${status}）。しばらく待ってから再試行してください。`,
          retryable: true
        };
    }
  }

  // Handle timeout errors
  if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
    return {
      type: 'timeout',
      message: 'リクエストがタイムアウトしました。再試行してください。',
      retryable: true
    };
  }

  // Handle validation errors
  if (hasMessage(error)) {
    const message = error.message;
    if (message.includes('validation') || message.includes('invalid')) {
      return {
        type: 'validation',
        message: '入力データが無効です。内容を確認してください。',
        retryable: false,
        details: { originalMessage: message }
      };
    }
  }

  // Generic error handling
  return {
    type: 'unknown',
    message: `${context}に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
    retryable: true,
    details: { originalError: error }
  };
};

/**
 * Retry utility with exponential backoff
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffMultiplier = 2,
    shouldRetry = (error: unknown) => {
      const apiError = handleApiError(error, 'retry');
      return apiError.retryable;
    }
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      const waitTime = delay * Math.pow(backoffMultiplier, attempt);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
};

/**
 * Fallback utility for graceful degradation
 */
export const withFallback = async <T>(
  primary: () => Promise<T>,
  fallback: () => T | Promise<T>,
  cacheKey?: string
): Promise<T> => {
  try {
    const result = await primary();
    
    // Cache successful result if cache key is provided
    if (cacheKey && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`fallback_cache_${cacheKey}`, JSON.stringify(result));
      } catch {
        // Ignore cache errors
      }
    }
    
    return result;
  } catch (error) {
    console.warn('Primary operation failed, falling back:', error);
    
    // Try to get cached result first
    if (cacheKey && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`fallback_cache_${cacheKey}`);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {
        // Ignore cache errors
      }
    }
    
    return await fallback();
  }
};

/**
 * Error boundary HOC for wrapping components with error handling
 */
export const withErrorBoundary = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  FallbackComponent?: React.ComponentType<{ error: AppError; retry: () => void }>
): React.ComponentType<T> => {
  const WrappedComponent: React.FC<T> = (props) => {
    const ErrorBoundary = React.lazy(() =>
      import('../components/ErrorBoundary').then(module => ({ default: module.ErrorBoundary }))
    );

    const defaultAppError: AppError = {
      component: 'Unknown',
      error: new Error('An error occurred'),
      timestamp: new Date()
    };

    return React.createElement(
      React.Suspense,
      { fallback: React.createElement('div', null, 'Loading...') },
      React.createElement(
        ErrorBoundary,
        {
          fallback: FallbackComponent ? React.createElement(FallbackComponent, { error: defaultAppError, retry: () => {} }) : undefined,
          children: React.createElement(Component, props)
        }
      )
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent as React.ComponentType<T>;
};

/**
 * Custom hook for handling async operations with error state
 */
export const useErrorHandler = () => {
  const [error, setError] = React.useState<ApiError | null>(null);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleError = React.useCallback((err: unknown, context: string) => {
    const apiError = handleApiError(err, context);
    setError(apiError);
    
    // Log error for debugging
    console.error(`Error in ${context}:`, err);
    
    return apiError;
  }, []);

  const retry = React.useCallback(async <T>(
    operation: () => Promise<T>,
    context: string
  ): Promise<T | null> => {
    if (!error?.retryable) {
      return null;
    }

    setIsRetrying(true);
    setError(null);

    try {
      const result = await withRetry(operation, {
        maxRetries: 3,
        delay: error.retryAfter ? error.retryAfter * 1000 : 1000
      });
      return result;
    } catch (err) {
      handleError(err, `${context} (retry)`);
      return null;
    } finally {
      setIsRetrying(false);
    }
  }, [error, handleError]);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isRetrying,
    handleError,
    retry,
    clearError
  };
};

/**
 * Safe async operation wrapper
 */
export const safeAsync = async <T>(
  operation: () => Promise<T>,
  context: string,
  fallbackValue?: T
): Promise<{ data: T | null; error: ApiError | null }> => {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (err) {
    const error = handleApiError(err, context);
    return {
      data: fallbackValue ?? null,
      error
    };
  }
};

/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error === null || error === undefined) {
    return '不明なエラーが発生しました';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  if (typeof error === 'object' && 'type' in error) {
    const apiError = error as ApiError;
    return apiError.message;
  }

  return '不明なエラーが発生しました';
};

/**
 * Error severity levels
 */
export type ErrorSeverity = 'info' | 'warning' | 'error';

/**
 * Get error severity based on error type
 */
export const getErrorSeverity = (error: unknown): ErrorSeverity => {
  if (error === null || error === undefined) {
    return 'info';
  }

  if (typeof error === 'object' && 'type' in error) {
    const apiError = error as ApiError;
    switch (apiError.type) {
      case 'network':
      case 'timeout':
        return 'warning';
      case 'validation':
        return 'warning';
      case 'auth':
      case 'server':
        return 'error';
      case 'rate_limit':
        return 'warning';
      default:
        return 'error';
    }
  }

  return 'error';
};

/**
 * Check if an error is retryable
 */
export const isRetryableError = (error: unknown): boolean => {
  if (error === null || error === undefined) {
    return false;
  }

  if (typeof error === 'object' && 'retryable' in error) {
    return Boolean((error as { retryable: unknown }).retryable);
  }

  return false;
};