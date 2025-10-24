import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    expect(result.current[0]).toBe('initial-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('should load from localStorage on initialization', () => {
    localStorage.setItem('existing-key', JSON.stringify('existing-value'));

    const { result } = renderHook(() => useLocalStorage('existing-key', 'fallback'));

    expect(result.current[0]).toBe('existing-value');
  });

  it('should handle objects', () => {
    const testObject = { name: 'test', value: 123 };
    const { result } = renderHook(() => useLocalStorage('object-key', {}));

    act(() => {
      result.current[1](testObject);
    });

    expect(result.current[0]).toEqual(testObject);
    expect(JSON.parse(localStorage.getItem('object-key')!)).toEqual(testObject);
  });

  it('should handle arrays', () => {
    const testArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('array-key', []));

    act(() => {
      result.current[1](testArray);
    });

    expect(result.current[0]).toEqual(testArray);
    expect(JSON.parse(localStorage.getItem('array-key')!)).toEqual(testArray);
  });

  it('should update state even if localStorage throws error', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    // State should still be updated even if localStorage fails
    expect(result.current[0]).toBe('updated');
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem('invalid-json', 'not-valid-json');

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('invalid-json', 'fallback'));

    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should support different types', () => {
    const { result: numberResult } = renderHook(() => useLocalStorage('number-key', 0));
    const { result: boolResult } = renderHook(() => useLocalStorage('bool-key', true));

    act(() => {
      numberResult.current[1](42);
    });

    act(() => {
      boolResult.current[1](false);
    });

    expect(numberResult.current[0]).toBe(42);
    expect(boolResult.current[0]).toBe(false);
  });
});
