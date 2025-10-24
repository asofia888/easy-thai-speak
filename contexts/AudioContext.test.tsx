import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { AudioProvider, useAudio } from './AudioContext';
import React from 'react';

// Mock useTextToSpeech hook
vi.mock('../hooks/useTextToSpeech', () => ({
  useTextToSpeech: () => ({
    isSupported: true,
    isSpeaking: false,
    voices: [],
    selectedVoice: null,
    setSelectedVoice: vi.fn(),
    rate: 1.0,
    setRate: vi.fn(),
    speak: vi.fn(),
    cancel: vi.fn(),
    testAudio: vi.fn(),
  }),
}));

describe('AudioContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AudioProvider>{children}</AudioProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide audio context values', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.isSupported).toBe(true);
    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.voices).toEqual([]);
    expect(result.current.selectedVoice).toBeNull();
  });

  it('should have speakThai function', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    expect(result.current.speakThai).toBeDefined();
    expect(typeof result.current.speakThai).toBe('function');
  });

  it('should have all required audio control functions', () => {
    const { result } = renderHook(() => useAudio(), { wrapper });

    expect(result.current.speak).toBeDefined();
    expect(result.current.cancel).toBeDefined();
    expect(result.current.testAudio).toBeDefined();
    expect(result.current.setSelectedVoice).toBeDefined();
    expect(result.current.setRate).toBeDefined();
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAudio());
    }).toThrow('useAudio must be used within an AudioProvider');
  });
});
