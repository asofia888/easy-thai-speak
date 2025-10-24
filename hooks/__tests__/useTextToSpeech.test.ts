import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTextToSpeech } from '../useTextToSpeech';

describe('useTextToSpeech hook', () => {
  let mockSpeechSynthesis: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock window.speechSynthesis
    mockSpeechSynthesis = {
      getVoices: vi.fn().mockReturnValue([
        { lang: 'th-TH', name: 'Thai Voice' } as SpeechSynthesisVoice,
        { lang: 'en-US', name: 'English Voice' } as SpeechSynthesisVoice,
      ]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      cancel: vi.fn(),
      speak: vi.fn(),
      speaking: false,
      pending: false,
      paused: false,
    };

    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with isSupported as true', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.isSupported).toBe(true);
  });

  it('should load voices on initialization', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(mockSpeechSynthesis.getVoices).toHaveBeenCalled();
    expect(result.current.voices.length).toBeGreaterThan(0);
  });

  it('should find and set Thai voice', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.selectedVoice).toBeDefined();
    expect(result.current.selectedVoice?.lang).toMatch(/^th/);
  });

  it('should set selectedVoice to null if no Thai voice found', () => {
    mockSpeechSynthesis.getVoices.mockReturnValue([
      { lang: 'en-US', name: 'English Voice' } as SpeechSynthesisVoice,
    ]);

    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.selectedVoice).toBeNull();
  });

  it('should register voiceschanged listener', () => {
    renderHook(() => useTextToSpeech());

    expect(mockSpeechSynthesis.addEventListener).toHaveBeenCalledWith(
      'voiceschanged',
      expect.any(Function)
    );
  });

  it('should return isSpeaking state', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(result.current.isSpeaking).toBe(false);
  });

  it('should have speak function', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(typeof result.current.speak).toBe('function');
  });

  it('should warn when speak is called but SpeechSynthesis not supported', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const originalSpeechSynthesis = window.speechSynthesis;
    delete (window as any).speechSynthesis;

    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      result.current.speak('test', 'th');
    });

    expect(consoleSpy).toHaveBeenCalled();

    Object.defineProperty(window, 'speechSynthesis', {
      value: originalSpeechSynthesis,
      writable: true,
    });

    consoleSpy.mockRestore();
  });

  it('should support setting speech rate', async () => {
    const { result } = renderHook(() => useTextToSpeech());

    await act(async () => {
      result.current.setRate(1.5);
    });

    expect(result.current.rate).toBe(1.5);
  });

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useTextToSpeech());

    unmount();

    expect(mockSpeechSynthesis.removeEventListener).toHaveBeenCalledWith(
      'voiceschanged',
      expect.any(Function)
    );
  });

  it('should have setRate function', () => {
    const { result } = renderHook(() => useTextToSpeech());

    expect(typeof result.current.setRate).toBe('function');
  });
});
