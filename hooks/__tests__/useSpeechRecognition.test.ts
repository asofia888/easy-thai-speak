import { describe, it, expect } from 'vitest';
import { useSpeechRecognition } from '../useSpeechRecognition';

describe('useSpeechRecognition hook', () => {
  it('should be a function', () => {
    expect(typeof useSpeechRecognition).toBe('function');
  });
});
