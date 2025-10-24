import { describe, it, expect } from 'vitest';
import { useAdvancedSpeechRecognition } from '../useAdvancedSpeechRecognition';

describe('useAdvancedSpeechRecognition hook', () => {
  it('should be a function', () => {
    expect(typeof useAdvancedSpeechRecognition).toBe('function');
  });
});
