import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateConversation, getPronunciationFeedback } from '../geminiService';

global.fetch = vi.fn();

describe('Gemini Service - Integration Tests', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateConversation - API Integration', () => {
    const mockValidConversation = [
      {
        speaker: 'A',
        thai: 'สวัสดีครับ',
        pronunciation: 'sa-wat-dee khrap',
        japanese: 'こんにちは',
        words: [
          {
            thai: 'สวัสดี',
            pronunciation: 'sa-wat-dee',
            japanese: 'こんにちは',
          },
          { thai: 'ครับ', pronunciation: 'khrap', japanese: '～です（敬語）' },
        ],
      },
      {
        speaker: 'B',
        thai: 'สวัสดีค่ะ',
        pronunciation: 'sa-wat-dee kha',
        japanese: 'こんにちは',
        words: [
          {
            thai: 'สวัสดี',
            pronunciation: 'sa-wat-dee',
            japanese: 'こんにちは',
          },
          { thai: 'ค่ะ', pronunciation: 'kha', japanese: '～です（敬語）' },
        ],
      },
    ];

    it('should make POST request to /api/conversation', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: mockValidConversation }),
      });

      await generateConversation('greeting');

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/conversation',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: 'greeting' }),
        })
      );
    });

    it('should return conversation array with correct structure', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: mockValidConversation }),
      });

      const result = await generateConversation('greeting');

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('speaker');
      expect(result[0]).toHaveProperty('thai');
      expect(result[0]).toHaveProperty('pronunciation');
      expect(result[0]).toHaveProperty('japanese');
      expect(result[0]).toHaveProperty('words');
    });

    it('should handle AbortSignal for timeout', async () => {
      let capturedSignal: AbortSignal | undefined;
      (global.fetch as any).mockImplementation(
        (_url: string, options: any) => {
          capturedSignal = options.signal;
          return new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ conversation: mockValidConversation }),
                }),
              100
            )
          );
        }
      );

      await generateConversation('greeting');

      expect(capturedSignal).toBeDefined();
      expect(capturedSignal instanceof AbortSignal).toBe(true);
    });

    it('should throw error on 400 Bad Request', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid topic' }),
      });

      await expect(generateConversation('invalid')).rejects.toThrow();
    });

    it('should throw error on 401 Unauthorized', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      });

      await expect(generateConversation('greeting')).rejects.toThrow(
        /API認証エラー/
      );
    });

    it('should retry on 429 Rate Limit', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          json: async () => ({ error: 'Rate limit exceeded' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ conversation: mockValidConversation }),
        });

      const result = await generateConversation('greeting');

      expect(result).toEqual(mockValidConversation);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should retry on 503 Service Unavailable', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: async () => ({ error: 'Service Unavailable' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ conversation: mockValidConversation }),
        });

      const result = await generateConversation('greeting');

      expect(result).toEqual(mockValidConversation);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should fail after max retries for 503', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({ error: 'Service Unavailable' }),
      });

      await expect(generateConversation('greeting')).rejects.toThrow();

      // Should try initial + retries (2 retries)
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('should throw error on missing conversation in response', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await expect(generateConversation('greeting')).rejects.toThrow(
        /Empty response/
      );
    });

    it('should handle network errors', async () => {
      const networkError = new TypeError('Network error');
      (global.fetch as any).mockRejectedValueOnce(networkError);

      await expect(generateConversation('greeting')).rejects.toThrow();
    });

    it('should handle JSON parse errors in response', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new SyntaxError('Invalid JSON');
        },
      });

      await expect(generateConversation('greeting')).rejects.toThrow();
    });

    it('should include conversation words with all fields', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: mockValidConversation }),
      });

      const result = await generateConversation('greeting');

      const firstWord = result[0].words[0];
      expect(firstWord).toHaveProperty('thai');
      expect(firstWord).toHaveProperty('pronunciation');
      expect(firstWord).toHaveProperty('japanese');
    });

    it('should handle optional grammarPoint field', async () => {
      const conversationWithGrammar = [
        ...mockValidConversation,
      ] as any;
      conversationWithGrammar[0].grammarPoint = {
        title: 'Particle ครับ',
        explanation: 'Thai formal address particle',
        examples: [
          {
            thai: 'ไปทำงานครับ',
            pronunciation: 'bpai tham ngan khrap',
            japanese: '仕事に行きます',
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: conversationWithGrammar }),
      });

      const result = await generateConversation('greeting');

      expect(result[0].grammarPoint).toBeDefined();
      expect(result[0].grammarPoint?.title).toBe('Particle ครับ');
    });

    it('should handle multiple speakers in conversation', async () => {
      const multiSpeakerConversation = [
        ...mockValidConversation,
        {
          speaker: 'C',
          thai: 'ยินดีต้อนรับ',
          pronunciation: 'yin-dee ton-rap',
          japanese: 'ようこそ',
          words: [
            {
              thai: 'ยินดี',
              pronunciation: 'yin-dee',
              japanese: '喜び',
            },
          ],
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: multiSpeakerConversation }),
      });

      const result = await generateConversation('greeting');

      const speakers = result.map((line) => line.speaker);
      expect(speakers).toContain('A');
      expect(speakers).toContain('B');
      expect(speakers).toContain('C');
    });

    it('should preserve pronunciation format (Paiboon)', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: mockValidConversation }),
      });

      const result = await generateConversation('greeting');

      expect(result[0].pronunciation).toMatch(/sa-wat-dee/);
      expect(result[0].pronunciation).toMatch(/khrap/);
    });

    it('should handle special Thai characters', async () => {
      const thaiSpecialConversation = [
        {
          speaker: 'A',
          thai: 'ตัวอักษรพิเศษ: ฺ ์ ํ',
          pronunciation: 'special chars',
          japanese: '特殊文字',
          words: [],
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversation: thaiSpecialConversation }),
      });

      const result = await generateConversation('greeting');

      expect(result[0].thai).toContain('ฺ');
    });
  });

  describe('getPronunciationFeedback - API Integration', () => {
    const mockFeedback = {
      score: 85,
      pronunciation: 'สวัสดี',
      feedback: 'Good pronunciation',
      suggestions: ['Practice tone'],
    };

    it('should make POST request to /api/feedback', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feedback: mockFeedback }),
      });

      await getPronunciationFeedback('sa-wat-dee', 'สวัสดี');

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feedback',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: 'sa-wat-dee', correctPhrase: 'สวัสดี' }),
        })
      );
    });

    it('should return feedback with score', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feedback: mockFeedback }),
      });

      const result = await getPronunciationFeedback('sa-wat-dee', 'สวัสดี');

      expect(result).toHaveProperty('score');
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it('should return feedback string', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feedback: mockFeedback }),
      });

      const result = await getPronunciationFeedback('sa-wat-dee', 'สวัสดี');

      expect(result).toHaveProperty('feedback');
      expect(typeof result.feedback).toBe('string');
    });

    it('should throw error on failed feedback request', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      await expect(
        getPronunciationFeedback('sa-wat-dee', 'สวัสดี')
      ).rejects.toThrow();
    });

    it('should retry on 503 for feedback', async () => {
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: async () => ({ error: 'Service Unavailable' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ feedback: mockFeedback }),
        });

      const result = await getPronunciationFeedback('sa-wat-dee', 'สวัสดี');

      expect(result).toEqual(mockFeedback);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should handle empty feedback response', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await expect(
        getPronunciationFeedback('sa-wat-dee', 'สวัสดี')
      ).rejects.toThrow();
    });

    it('should handle transcript and correct phrase parameters', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feedback: mockFeedback }),
      });

      const transcript = 'sa-wad-dee'; // User's pronunciation
      const correctPhrase = 'สวัสดี'; // Correct phrase

      await getPronunciationFeedback(transcript, correctPhrase);

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feedback',
        expect.objectContaining({
          body: JSON.stringify({
            transcript,
            correctPhrase,
          }),
        })
      );
    });

    it('should handle timeout in feedback request', async () => {
      (global.fetch as any).mockImplementation(
        () =>
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error('Timeout')),
              100
            )
          )
      );

      await expect(
        getPronunciationFeedback('sa-wat-dee', 'สวัสดี')
      ).rejects.toThrow();
    });
  });

  describe('Error Handling Consistency', () => {
    it('should handle errors consistently across endpoints', async () => {
      const error500 = {
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      };

      (global.fetch as any).mockResolvedValue(error500);

      const conversationError = await generateConversation('test').catch(
        (e) => e
      );
      const feedbackError = await getPronunciationFeedback(
        'test',
        'テスト'
      ).catch((e) => e);

      expect(conversationError).toBeDefined();
      expect(feedbackError).toBeDefined();
    });

    it('should provide user-friendly error messages', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit' }),
      });

      try {
        await generateConversation('test');
      } catch (error: any) {
        expect(error.message).toMatch(/API使用制限に達しました/);
      }
    });
  });

  describe('Performance Characteristics', () => {
    it('should not block on slow API responses', async () => {
      const mockConversation = [
        {
          speaker: 'A',
          thai: 'test',
          pronunciation: 'test',
          japanese: 'test',
          words: [],
        },
      ];

      (global.fetch as any).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ conversation: mockConversation }),
                }),
              50
            )
          )
      );

      const startTime = Date.now();
      await generateConversation('test');
      const duration = Date.now() - startTime;

      expect(duration).toBeGreaterThan(40);
    });
  });
});
