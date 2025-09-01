import React from 'react';

export type ApiErrorType = 'network' | 'auth' | 'rate_limit' | 'server' | 'validation' | 'timeout' | 'unknown';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  retryable: boolean;
  retryAfter?: number;
  details?: Record<string, any>;
}

export interface AppError {
  component: string;
  error: Error | ApiError;
  context?: Record<string, any>;
  timestamp: Date;
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
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status;
    
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
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as any).message;
    if (message?.includes('validation') || message?.includes('invalid')) {
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
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffMultiplier = 2,
    shouldRetry = (error) => {
      const apiError = handleApiError(error, 'retry');
      return apiError.retryable;
    }
  } = options;

  let lastError: any;

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
export const withErrorBoundary = <T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  FallbackComponent?: React.ComponentType<{ error: AppError; retry: () => void }>
) => {
  const WrappedComponent = React.forwardRef<any, T>((props, ref) => {
    const ErrorBoundary = React.lazy(() => import('../components/ErrorBoundary'));
    
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={FallbackComponent}>
          <Component {...props} ref={ref} />
        </ErrorBoundary>
      </React.Suspense>
    );
  });
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
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