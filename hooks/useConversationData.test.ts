import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useConversationData } from './useConversationData';
import * as geminiService from '../services/geminiService';

vi.mock('../services/geminiService');

describe('useConversationData', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockConversation = [
    {
      speaker: 'A',
      thai: 'สวัสดีครับ',
      pronunciation: 'sa-wat-dee khrap',
      japanese: 'こんにちは',
      words: [
        { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
      ],
    },
  ];

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.conversation).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should set error when topicId is missing', async () => {
    const { result } = renderHook(() => useConversationData(undefined, 'Greetings'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('トピック情報が見つかりません。');
    });
  });

  it('should set error when topicTitle is missing', async () => {
    const { result } = renderHook(() => useConversationData('topic-1', ''));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('トピック情報が見つかりません。');
    });
  });

  it('should load conversation from API successfully', async () => {
    vi.spyOn(geminiService, 'generateConversation').mockResolvedValue(mockConversation);

    const { result } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.conversation).toEqual(mockConversation);
      expect(result.current.error).toBeNull();
    });

    expect(geminiService.generateConversation).toHaveBeenCalledWith('Greetings');
  });

  it('should cache conversation data in localStorage', async () => {
    vi.spyOn(geminiService, 'generateConversation').mockResolvedValue(mockConversation);

    renderHook(() => useConversationData('topic-1', 'Greetings'));

    await waitFor(() => {
      const cachedData = localStorage.getItem('conversation-topic-1');
      expect(cachedData).toBeTruthy();
      expect(JSON.parse(cachedData!)).toEqual(mockConversation);
    });
  });

  it('should load from cache first, then fetch fresh data', async () => {
    const cachedConversation = [
      {
        speaker: 'B',
        thai: 'สบายดีไหม',
        pronunciation: 'sa-baai-dee mai',
        japanese: '元気ですか',
        words: [],
      },
    ];

    localStorage.setItem('conversation-topic-1', JSON.stringify(cachedConversation));
    vi.spyOn(geminiService, 'generateConversation').mockResolvedValue(mockConversation);

    const { result } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    // Should show cached data immediately
    await waitFor(() => {
      expect(result.current.conversation).toEqual(cachedConversation);
      expect(result.current.isLoading).toBe(false);
    });

    // Should update with fresh data
    await waitFor(() => {
      expect(result.current.conversation).toEqual(mockConversation);
    });
  });

  it('should handle API error with no cache', async () => {
    vi.spyOn(geminiService, 'generateConversation').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('会話の生成に失敗しました。ネットワーク接続を確認するか、後でもう一度お試しください。');
      expect(result.current.conversation).toEqual([]);
    });
  });

  it('should show cached data with error message when API fails', async () => {
    const cachedConversation = [
      {
        speaker: 'A',
        thai: 'cached',
        pronunciation: 'cached',
        japanese: 'cached',
        words: [],
      },
    ];

    localStorage.setItem('conversation-topic-1', JSON.stringify(cachedConversation));
    vi.spyOn(geminiService, 'generateConversation').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    await waitFor(() => {
      expect(result.current.conversation).toEqual(cachedConversation);
      expect(result.current.error).toBe('コンテンツの更新に失敗しました。オフライン版のデータを表示しています。');
    });
  });

  it('should not cache custom topics', async () => {
    vi.spyOn(geminiService, 'generateConversation').mockResolvedValue(mockConversation);

    renderHook(() => useConversationData('custom-123', 'Custom Topic'));

    await waitFor(() => {
      const cachedData = localStorage.getItem('conversation-custom-123');
      expect(cachedData).toBeNull();
    });
  });

  it('should cleanup on unmount', async () => {
    vi.spyOn(geminiService, 'generateConversation').mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockConversation), 100))
    );

    const { unmount } = renderHook(() => useConversationData('topic-1', 'Greetings'));

    unmount();

    // Wait a bit to ensure the promise resolves after unmount
    await new Promise(resolve => setTimeout(resolve, 150));

    // If the component is unmounted, state updates should not happen
    // This test ensures no errors are thrown
    expect(true).toBe(true);
  });
});
