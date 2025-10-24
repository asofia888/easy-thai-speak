import { describe, it, expect, vi } from 'vitest';
import {
    handleApiError,
    withRetry,
    withFallback,
    getErrorMessage,
    getErrorSeverity,
    isRetryableError,
    safeAsync,
} from '../errorHandling';

describe('errorHandling utilities', () => {
    describe('handleApiError', () => {
        it('should handle network errors', () => {
            const error = new TypeError('fetch failed');
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('network');
            expect(result.message).toContain('ネットワーク接続エラー');
            expect(result.retryable).toBe(true);
        });

        it('should handle 401 auth errors', () => {
            const error = { status: 401 };
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('auth');
            expect(result.message).toContain('API認証エラー');
            expect(result.retryable).toBe(false);
        });

        it('should handle 429 rate limit errors', () => {
            const error = { status: 429 };
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('rate_limit');
            expect(result.message).toContain('API使用制限');
            expect(result.retryable).toBe(true);
            expect(result.retryAfter).toBe(60);
        });

        it('should handle 503 server errors', () => {
            const error = { status: 503 };
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('server');
            expect(result.message).toContain('サーバーが一時的に利用できません');
            expect(result.retryable).toBe(true);
        });

        it('should handle timeout errors', () => {
            const error = { name: 'AbortError' };
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('timeout');
            expect(result.message).toContain('タイムアウト');
            expect(result.retryable).toBe(true);
        });

        it('should handle validation errors', () => {
            const error = { message: 'validation failed' };
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('validation');
            expect(result.message).toContain('入力データが無効');
            expect(result.retryable).toBe(false);
        });

        it('should handle unknown errors', () => {
            const error = new Error('Unknown error');
            const result = handleApiError(error, 'test context');

            expect(result.type).toBe('unknown');
            expect(result.message).toContain('test context');
            expect(result.retryable).toBe(true);
        });
    });

    describe('withRetry', () => {
        it('should succeed on first try', async () => {
            const mockFn = vi.fn().mockResolvedValue('success');

            const result = await withRetry(mockFn, { maxRetries: 3 });

            expect(result).toBe('success');
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should retry on failure and eventually succeed', async () => {
            const mockFn = vi.fn()
                .mockRejectedValueOnce(new Error('fail 1'))
                .mockRejectedValueOnce(new Error('fail 2'))
                .mockResolvedValue('success');

            const result = await withRetry(mockFn, {
                maxRetries: 3,
                delay: 10,
            });

            expect(result).toBe('success');
            expect(mockFn).toHaveBeenCalledTimes(3);
        });

        it('should throw after max retries', async () => {
            const mockFn = vi.fn().mockRejectedValue(new Error('persistent failure'));

            await expect(
                withRetry(mockFn, { maxRetries: 2, delay: 10 })
            ).rejects.toThrow('persistent failure');

            expect(mockFn).toHaveBeenCalledTimes(3); // initial + 2 retries
        });

        it('should not retry non-retryable errors', async () => {
            const error = { status: 401 }; // auth error - not retryable
            const mockFn = vi.fn().mockRejectedValue(error);

            await expect(
                withRetry(mockFn, { maxRetries: 3, delay: 10 })
            ).rejects.toEqual(error);

            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should use custom shouldRetry function', async () => {
            const mockFn = vi.fn().mockRejectedValue(new Error('custom error'));
            const shouldRetry = vi.fn().mockReturnValue(false);

            await expect(
                withRetry(mockFn, { maxRetries: 3, shouldRetry })
            ).rejects.toThrow('custom error');

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(shouldRetry).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('withFallback', () => {
        it('should return primary result on success', async () => {
            const primary = vi.fn().mockResolvedValue('primary');
            const fallback = vi.fn().mockReturnValue('fallback');

            const result = await withFallback(primary, fallback);

            expect(result).toBe('primary');
            expect(primary).toHaveBeenCalled();
            expect(fallback).not.toHaveBeenCalled();
        });

        it('should return fallback result on primary failure', async () => {
            const primary = vi.fn().mockRejectedValue(new Error('fail'));
            const fallback = vi.fn().mockReturnValue('fallback');

            const result = await withFallback(primary, fallback);

            expect(result).toBe('fallback');
            expect(primary).toHaveBeenCalled();
            expect(fallback).toHaveBeenCalled();
        });

        it('should cache successful primary result', async () => {
            const primary = vi.fn().mockResolvedValue({ data: 'test' });
            const fallback = vi.fn();

            await withFallback(primary, fallback, 'test-key');

            const cached = localStorage.getItem('fallback_cache_test-key');
            expect(cached).toBeTruthy();
            expect(JSON.parse(cached!)).toEqual({ data: 'test' });
        });

        it('should use cached result when available', async () => {
            const cachedData = { data: 'cached' };
            localStorage.setItem('fallback_cache_test-key', JSON.stringify(cachedData));

            const primary = vi.fn().mockRejectedValue(new Error('fail'));
            const fallback = vi.fn().mockReturnValue({ data: 'fallback' });

            const result = await withFallback(primary, fallback, 'test-key');

            expect(result).toEqual(cachedData);
            expect(fallback).not.toHaveBeenCalled();

            localStorage.removeItem('fallback_cache_test-key');
        });
    });

    describe('getErrorMessage', () => {
        it('should extract message from ApiError', () => {
            const error = { type: 'network', message: 'Network error', retryable: true };
            expect(getErrorMessage(error)).toBe('Network error');
        });

        it('should extract message from Error', () => {
            const error = new Error('Test error');
            expect(getErrorMessage(error)).toBe('Test error');
        });

        it('should handle string errors', () => {
            expect(getErrorMessage('String error')).toBe('String error');
        });

        it('should handle null/undefined', () => {
            expect(getErrorMessage(null)).toBe('不明なエラーが発生しました');
            expect(getErrorMessage(undefined)).toBe('不明なエラーが発生しました');
        });

        it('should handle unknown error types', () => {
            expect(getErrorMessage({ unknown: 'object' })).toBe('エラーが発生しました');
        });
    });

    describe('getErrorSeverity', () => {
        it('should return warning for network errors', () => {
            const error = { type: 'network', message: '', retryable: true };
            expect(getErrorSeverity(error)).toBe('warning');
        });

        it('should return warning for timeout errors', () => {
            const error = { type: 'timeout', message: '', retryable: true };
            expect(getErrorSeverity(error)).toBe('warning');
        });

        it('should return error for auth errors', () => {
            const error = { type: 'auth', message: '', retryable: false };
            expect(getErrorSeverity(error)).toBe('error');
        });

        it('should return error for server errors', () => {
            const error = { type: 'server', message: '', retryable: true };
            expect(getErrorSeverity(error)).toBe('error');
        });

        it('should return warning for validation errors', () => {
            const error = { type: 'validation', message: '', retryable: false };
            expect(getErrorSeverity(error)).toBe('warning');
        });

        it('should return info for null', () => {
            expect(getErrorSeverity(null)).toBe('info');
        });

        it('should return error for unknown types', () => {
            const error = new Error('test');
            expect(getErrorSeverity(error)).toBe('error');
        });
    });

    describe('isRetryableError', () => {
        it('should return true for retryable errors', () => {
            const error = { type: 'network', message: '', retryable: true };
            expect(isRetryableError(error)).toBe(true);
        });

        it('should return false for non-retryable errors', () => {
            const error = { type: 'auth', message: '', retryable: false };
            expect(isRetryableError(error)).toBe(false);
        });

        it('should return false for objects without retryable property', () => {
            expect(isRetryableError({ message: 'error' })).toBe(false);
            expect(isRetryableError(new Error('test'))).toBe(false);
        });

        it('should return false for null/undefined', () => {
            expect(isRetryableError(null)).toBe(false);
            expect(isRetryableError(undefined)).toBe(false);
        });
    });

    describe('safeAsync', () => {
        it('should return data on success', async () => {
            const operation = vi.fn().mockResolvedValue('success data');

            const result = await safeAsync(operation, 'test operation');

            expect(result.data).toBe('success data');
            expect(result.error).toBeNull();
        });

        it('should return error on failure', async () => {
            const operation = vi.fn().mockRejectedValue(new Error('operation failed'));

            const result = await safeAsync(operation, 'test operation');

            expect(result.data).toBeNull();
            expect(result.error).toBeTruthy();
            expect(result.error?.message).toContain('test operation');
        });

        it('should return fallback value on failure', async () => {
            const operation = vi.fn().mockRejectedValue(new Error('failed'));
            const fallbackValue = 'fallback data';

            const result = await safeAsync(operation, 'test', fallbackValue);

            expect(result.data).toBe(fallbackValue);
            expect(result.error).toBeTruthy();
        });
    });
});
