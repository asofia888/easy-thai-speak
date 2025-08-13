import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, AsyncErrorBoundary, withErrorBoundary } from '../ErrorBoundary';

// Component that throws an error for testing
const ThrowErrorComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Async component that throws promise rejection
const AsyncErrorComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  React.useEffect(() => {
    if (shouldThrow) {
      Promise.reject(new Error('Async test error'));
    }
  }, [shouldThrow]);
  
  return <div>No async error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error during tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('申し訳ございません')).toBeInTheDocument();
    expect(screen.getByText(/予期しないエラーが発生しました/)).toBeInTheDocument();
  });

  it('calls custom error handler when provided', () => {
    const onError = jest.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('renders custom fallback when provided', () => {
    const fallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('allows retry functionality', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('申し訳ございません')).toBeInTheDocument();

    // Click retry button
    fireEvent.click(screen.getByText('もう一度試す'));

    // Re-render with no error
    rerender(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('shows reload button', () => {
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('ページを再読み込み'));
    expect(mockReload).toHaveBeenCalled();
  });

  it('shows development error details in development mode', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('開発者向け: エラー詳細')).toBeInTheDocument();

    process.env.NODE_ENV = originalNodeEnv;
  });
});

describe('AsyncErrorBoundary', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <AsyncErrorBoundary>
        <AsyncErrorComponent shouldThrow={false} />
      </AsyncErrorBoundary>
    );

    expect(screen.getByText('No async error')).toBeInTheDocument();
  });

  it('handles promise rejections', async () => {
    render(
      <AsyncErrorBoundary>
        <AsyncErrorComponent shouldThrow={true} />
      </AsyncErrorBoundary>
    );

    // Wait for the promise rejection to be handled
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
  });

  it('shows custom fallback for async errors', () => {
    const fallback = <div>Async error fallback</div>;
    
    render(
      <AsyncErrorBoundary fallback={fallback}>
        <AsyncErrorComponent shouldThrow={true} />
      </AsyncErrorBoundary>
    );

    // Trigger promise rejection
    window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.reject(new Error('Async error')),
      reason: new Error('Async error')
    }));

    expect(screen.getByText('Async error fallback')).toBeInTheDocument();
  });
});

describe('withErrorBoundary HOC', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('wraps component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(ThrowErrorComponent);
    
    render(<WrappedComponent shouldThrow={false} />);
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('handles errors in wrapped component', () => {
    const WrappedComponent = withErrorBoundary(ThrowErrorComponent);
    
    render(<WrappedComponent shouldThrow={true} />);
    
    expect(screen.getByText('申し訳ございません')).toBeInTheDocument();
  });

  it('uses custom fallback in HOC', () => {
    const fallback = <div>HOC fallback</div>;
    const WrappedComponent = withErrorBoundary(ThrowErrorComponent, fallback);
    
    render(<WrappedComponent shouldThrow={true} />);
    
    expect(screen.getByText('HOC fallback')).toBeInTheDocument();
  });

  it('sets correct display name', () => {
    const TestComponent = () => <div>test</div>;
    TestComponent.displayName = 'TestComponent';
    
    const WrappedComponent = withErrorBoundary(TestComponent);
    
    expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)');
  });
});