import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRoleplay } from './useRoleplay';
import * as geminiService from '../services/geminiService';
import { ConversationLine } from '../types';

vi.mock('../services/geminiService');

describe('useRoleplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLine: ConversationLine = {
    speaker: 'A',
    thai: 'สวัสดีครับ',
    pronunciation: 'sa-wat-dee khrap',
    japanese: 'こんにちは',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
    ],
  };

  it('should initialize with selecting_role status', () => {
    const { result } = renderHook(() => useRoleplay());

    expect(result.current.status).toBe('selecting_role');
    expect(result.current.userRole).toBeNull();
    expect(result.current.messages).toEqual([]);
    expect(result.current.currentLineIndex).toBe(0);
  });

  it('should select role and change status to playing', () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    expect(result.current.status).toBe('playing');
    expect(result.current.userRole).toBe('Person A');
  });

  it('should add AI message and increment line index', () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    act(() => {
      result.current.addAiMessage(mockLine);
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      speaker: 'A',
      text: 'สวัสดีครับ',
      pronunciation: 'sa-wat-dee khrap',
      isUser: false,
    });
    expect(result.current.currentLineIndex).toBe(1);
  });

  it('should add user message with pending feedback', async () => {
    const mockFeedback = {
      score: 85,
      strengths: ['Good pronunciation'],
      improvements: ['Work on tone'],
      overallComment: 'Well done!',
    };

    vi.spyOn(geminiService, 'getPronunciationFeedback').mockResolvedValue(mockFeedback);

    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    await act(async () => {
      await result.current.addUserMessage('สวัสดี', mockLine);
    });

    // Check that message was added with loading state
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      speaker: 'Person A',
      text: 'สวัสดี',
      isUser: true,
      correctPhrase: 'สวัสดีครับ',
      correctPronunciation: 'sa-wat-dee khrap',
    });

    // Wait for feedback to be updated
    await waitFor(() => {
      expect(result.current.messages[0].feedback).toEqual(mockFeedback);
      expect(result.current.messages[0].isFeedbackLoading).toBe(false);
    });
  });

  it('should handle feedback error gracefully', async () => {
    vi.spyOn(geminiService, 'getPronunciationFeedback').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    await act(async () => {
      await result.current.addUserMessage('test', mockLine);
    });

    await waitFor(() => {
      expect(result.current.messages[0].feedbackError).toBe('API Error');
      expect(result.current.messages[0].isFeedbackLoading).toBe(false);
    });
  });

  it('should not add user message if transcript is empty', async () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    await act(async () => {
      await result.current.addUserMessage('', mockLine);
    });

    expect(result.current.messages).toHaveLength(0);
  });

  it('should proceed to next line', () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    expect(result.current.currentLineIndex).toBe(0);

    act(() => {
      result.current.proceedToNextLine();
    });

    expect(result.current.currentLineIndex).toBe(1);
  });

  it('should end roleplay', () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    expect(result.current.status).toBe('playing');

    act(() => {
      result.current.endRoleplay();
    });

    expect(result.current.status).toBe('ended');
  });

  it('should handle multiple messages correctly', () => {
    const { result } = renderHook(() => useRoleplay());

    act(() => {
      result.current.selectRole('Person A');
    });

    act(() => {
      result.current.addAiMessage(mockLine);
    });

    act(() => {
      result.current.addAiMessage({ ...mockLine, speaker: 'B', thai: 'สบายดีไหม' });
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.currentLineIndex).toBe(2);
  });
});
