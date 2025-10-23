
import { ConversationLine, Feedback } from '../types';
import { handleApiError, withRetry, ApiError } from '../utils/errorHandling';

/**
 * Generate conversation via server-side API
 *
 * All API requests go through the backend to ensure APIキー security.
 * Both development and production environments use the same /api endpoint.
 * In development, Vite proxy (vite.config.ts) routes /api to http://localhost:3001
 * In production, requests go to Vercel Serverless Functions.
 */
export const generateConversation = async (topic: string): Promise<ConversationLine[]> => {
    return withRetry(
        async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒タイムアウト

            try {
                const response = await fetch('/api/conversation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ topic }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const error = handleApiError({ status: response.status, ...errorData }, '会話生成');
                    throw new Error(error.message);
                }

                const data = await response.json();

                if (!data.conversation) {
                    throw new Error('Empty response from Gemini API');
                }

                return data.conversation as ConversationLine[];
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },
        {
            maxRetries: 2,
            delay: 2000,
            backoffMultiplier: 2,
            shouldRetry: (error) => {
                const apiError = handleApiError(error, '会話生成');
                return apiError.retryable;
            }
        }
    ).catch((error) => {
        const apiError = handleApiError(error, '会話生成');
        throw new Error(apiError.message);
    });
};


export const getPronunciationFeedback = async (transcript: string, correctPhrase: string): Promise<Feedback> => {
    return withRetry(
        async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒タイムアウト

            try {
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transcript, correctPhrase }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const error = handleApiError({ status: response.status, ...errorData }, 'フィードバック取得');
                    throw new Error(error.message);
                }

                const data = await response.json();

                if (!data.feedback) {
                    throw new Error('Empty feedback response');
                }

                return data.feedback as Feedback;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },
        {
            maxRetries: 2,
            delay: 1000,
            backoffMultiplier: 2
        }
    ).catch((error) => {
        const apiError = handleApiError(error, 'フィードバック取得');
        throw new Error(apiError.message);
    });
};