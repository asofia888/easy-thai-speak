import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SavedConversationsProvider, useSavedConversations } from './SavedConversationsContext';
import React from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SavedConversationsContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SavedConversationsProvider>{children}</SavedConversationsProvider>
  );

  it('should initialize with empty saved conversations', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    expect(result.current.savedConversations).toEqual([]);
  });

  it('should save a new conversation', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    let conversationId: string = '';

    act(() => {
      conversationId = result.current.saveConversation('Test Topic', mockConversation);
    });

    expect(conversationId).toBeTruthy();
    expect(conversationId).toMatch(/^saved-/);
    expect(result.current.savedConversations).toHaveLength(1);
    expect(result.current.savedConversations[0].title).toBe('Test Topic');
    expect(result.current.savedConversations[0].conversation).toEqual(mockConversation);
  });

  it('should load a saved conversation by ID', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    let conversationId: string = '';

    act(() => {
      conversationId = result.current.saveConversation('Test Topic', mockConversation);
    });

    const loaded = result.current.getConversationById(conversationId);

    expect(loaded).toBeTruthy();
    expect(loaded?.title).toBe('Test Topic');
    expect(loaded?.conversation).toEqual(mockConversation);
  });

  it('should delete a saved conversation', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    let conversationId: string = '';

    act(() => {
      conversationId = result.current.saveConversation('Test Topic', mockConversation);
    });

    expect(result.current.savedConversations).toHaveLength(1);

    act(() => {
      result.current.deleteConversation(conversationId);
    });

    expect(result.current.savedConversations).toHaveLength(0);
  });

  it('should update last accessed time', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    let conversationId: string = '';

    act(() => {
      conversationId = result.current.saveConversation('Test Topic', mockConversation);
    });

    const originalTime = result.current.savedConversations[0].lastAccessedAt;

    // Wait a bit to ensure time difference
    vi.useFakeTimers();
    vi.advanceTimersByTime(1000);

    act(() => {
      result.current.updateLastAccessed(conversationId);
    });

    vi.useRealTimers();

    const newTime = result.current.savedConversations[0].lastAccessedAt;
    expect(new Date(newTime).getTime()).toBeGreaterThan(new Date(originalTime).getTime());
  });

  it('should persist conversations to localStorage', () => {
    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    act(() => {
      result.current.saveConversation('Test Topic', mockConversation);
    });

    const stored = localStorage.getItem('easy-thai-speak-saved-conversations');
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].title).toBe('Test Topic');
  });

  it('should load conversations from localStorage on mount', () => {
    const mockConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sà-wàt-dii khráp',
        japanese: 'こんにちは',
        words: [],
      },
    ];

    const savedData = [
      {
        id: 'saved-123',
        title: 'Preloaded Topic',
        conversation: mockConversation,
        createdAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem('easy-thai-speak-saved-conversations', JSON.stringify(savedData));

    const { result } = renderHook(() => useSavedConversations(), { wrapper });

    expect(result.current.savedConversations).toHaveLength(1);
    expect(result.current.savedConversations[0].title).toBe('Preloaded Topic');
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useSavedConversations());
    }).toThrow('useSavedConversations must be used within a SavedConversationsProvider');
  });
});
