import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateConversation, getPronunciationFeedback } from './geminiService';

global.fetch = vi.fn();

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateConversation', () => {
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

    it('should successfully generate conversation', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: mockConversation }),
      });

      const result = await generateConversation('Greetings');

      expect(result).toEqual(mockConversation);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/conversation',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: 'Greetings' }),
        })
      );
    });

    it('should handle 503 error with retry', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: async () => ({ error: 'Service Unavailable', retryAfter: 1 }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ conversation: mockConversation }),
        });

      const result = await generateConversation('Greetings');

      expect(result).toEqual(mockConversation);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error after max retries for 503', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({ error: 'Service Unavailable' }),
      });

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'AIサービスが混雑しています'
      );

      expect(global.fetch).toHaveBeenCalledTimes(3); // initial + 2 retries
    });

    it('should handle 429 (rate limit) error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit exceeded' }),
      });

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'API使用制限に達しました'
      );
    });

    it('should handle 401 (auth) error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      });

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'API認証エラーが発生しました'
      );
    });

    it('should handle 502 (parse) error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 502,
        json: async () => ({ error: 'Bad Gateway' }),
      });

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'AI応答の解析に失敗しました'
      );
    });

    it('should handle network error', async () => {
      (global.fetch as any).mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'ネットワーク接続エラー'
      );
    });

    it('should handle generic API error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      });

      await expect(generateConversation('Greetings')).rejects.toThrow(
        'Internal Server Error'
      );
    });

    it('should retry on non-503 errors', async () => {
      (global.fetch as any)
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ conversation: mockConversation }),
        });

      const result = await generateConversation('Greetings');

      expect(result).toEqual(mockConversation);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('getPronunciationFeedback', () => {
    const mockFeedback = {
      score: 85,
      strengths: ['Good pronunciation'],
      improvements: ['Work on tone'],
      overallComment: 'Well done!',
    };

    it('should successfully get pronunciation feedback', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feedback: mockFeedback }),
      });

      const result = await getPronunciationFeedback('สวัสดี', 'สวัสดีครับ');

      expect(result).toEqual(mockFeedback);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feedback',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: 'สวัสดี', correctPhrase: 'สวัสดีครับ' }),
        })
      );
    });

    it('should handle API error', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      });

      await expect(getPronunciationFeedback('test', 'correct')).rejects.toThrow(
        'Internal Server Error'
      );
    });

    it('should handle network error', async () => {
      (global.fetch as any).mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(getPronunciationFeedback('test', 'correct')).rejects.toThrow(
        'ネットワーク接続エラー'
      );
    });

    it('should handle generic error', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Unknown error'));

      await expect(getPronunciationFeedback('test', 'correct')).rejects.toThrow(
        'フィードバックの取得に失敗しました'
      );
    });

    it('should handle malformed API response', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({}),
      });

      await expect(getPronunciationFeedback('test', 'correct')).rejects.toThrow(
        'フィードバックAPIリクエストが失敗しました'
      );
    });
  });
});
