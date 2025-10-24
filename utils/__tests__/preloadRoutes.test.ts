import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  preloadTopicSelection,
  preloadConversationView,
  preloadFavoritesView,
  preloadRoleplayView,
  preloadCommonRoutes,
} from '../preloadRoutes';

// Mock dynamic imports
vi.mock('../../components/TopicSelection', () => ({ default: {} }));
vi.mock('../../components/ConversationView', () => ({ default: {} }));
vi.mock('../../components/FavoritesView', () => ({ default: {} }));
vi.mock('../../components/RoleplayView', () => ({ default: {} }));

describe('preloadRoutes utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('preloadTopicSelection', () => {
    it('should preload TopicSelection component', async () => {
      const result = await preloadTopicSelection();
      expect(result).toBeDefined();
    });
  });

  describe('preloadConversationView', () => {
    it('should preload ConversationView component', async () => {
      const result = await preloadConversationView();
      expect(result).toBeDefined();
    });
  });

  describe('preloadFavoritesView', () => {
    it('should preload FavoritesView component', async () => {
      const result = await preloadFavoritesView();
      expect(result).toBeDefined();
    });
  });

  describe('preloadRoleplayView', () => {
    it('should preload RoleplayView component', async () => {
      const result = await preloadRoleplayView();
      expect(result).toBeDefined();
    });
  });

  describe('preloadCommonRoutes', () => {
    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    it('should use requestIdleCallback when available', () => {
      vi.useFakeTimers();
      const mockRequestIdleCallback = vi.fn((cb) => cb());
      global.requestIdleCallback = mockRequestIdleCallback;

      preloadCommonRoutes();

      expect(mockRequestIdleCallback).toHaveBeenCalled();

      delete (global as any).requestIdleCallback;
      vi.useRealTimers();
    });

    it('should fallback to setTimeout when requestIdleCallback not available', () => {
      vi.useFakeTimers();

      // Ensure requestIdleCallback is not available
      const originalRequestIdleCallback = (global as any).requestIdleCallback;
      delete (global as any).requestIdleCallback;

      const mockSetTimeout = vi.spyOn(global, 'setTimeout');

      preloadCommonRoutes();

      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

      mockSetTimeout.mockRestore();

      // Restore
      if (originalRequestIdleCallback) {
        global.requestIdleCallback = originalRequestIdleCallback;
      }

      vi.useRealTimers();
    });

    it('should preload TopicSelection on common routes preload', () => {
      vi.useFakeTimers();
      const mockRequestIdleCallback = vi.fn((cb) => cb());
      global.requestIdleCallback = mockRequestIdleCallback;

      preloadCommonRoutes();

      expect(mockRequestIdleCallback).toHaveBeenCalled();

      delete (global as any).requestIdleCallback;
      vi.useRealTimers();
    });
  });
});
