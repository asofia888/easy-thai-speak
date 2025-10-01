import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { FavoritesProvider, useFavorites } from './FavoritesContext';
import { Word } from '../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockWord: Word = {
    thai: 'สวัสดี',
    pronunciation: 'sa-wat-dee',
    japanese: 'こんにちは',
  };

  const mockWord2: Word = {
    thai: 'ขอบคุณ',
    pronunciation: 'khop-khun',
    japanese: 'ありがとう',
  };

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.reviewQueueCount).toBe(0);
  });

  it('should add a favorite word', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toMatchObject({
      thai: 'สวัสดี',
      pronunciation: 'sa-wat-dee',
      japanese: 'こんにちは',
      repetition: 0,
      interval: 0,
      easeFactor: 2.5,
    });
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
      result.current.addFavorite(mockWord);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('should sort favorites alphabetically in Thai', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord2); // ขอบคุณ
      result.current.addFavorite(mockWord);  // สวัสดี
    });

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.favorites[0].thai).toBe('ขอบคุณ');
    expect(result.current.favorites[1].thai).toBe('สวัสดี');
  });

  it('should remove a favorite word', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
      result.current.addFavorite(mockWord2);
    });

    expect(result.current.favorites).toHaveLength(2);

    act(() => {
      result.current.removeFavorite('สวัสดี');
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].thai).toBe('ขอบคุณ');
  });

  it('should check if word is favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    expect(result.current.isFavorite('สวัสดี')).toBe(true);
    expect(result.current.isFavorite('ไม่มี')).toBe(false);
  });

  it('should update favorite with "good" performance', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    const before = result.current.favorites[0];
    expect(before.repetition).toBe(0);
    expect(before.interval).toBe(0);

    act(() => {
      result.current.updateFavorite('สวัสดี', 'good');
    });

    const after = result.current.favorites[0];
    expect(after.repetition).toBe(1);
    expect(after.interval).toBe(1);
    expect(after.easeFactor).toBe(2.5);
  });

  it('should update favorite with "easy" performance', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    act(() => {
      result.current.updateFavorite('สวัสดี', 'easy');
    });

    const word = result.current.favorites[0];
    expect(word.repetition).toBe(1);
    expect(word.interval).toBe(1);
    expect(word.easeFactor).toBe(2.65); // 2.5 + 0.15
  });

  it('should reset favorite with "again" performance', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    // Build up some progress
    act(() => {
      result.current.updateFavorite('สวัสดี', 'good');
      result.current.updateFavorite('สวัสดี', 'good');
    });

    expect(result.current.favorites[0].repetition).toBe(2);

    // Reset with "again"
    act(() => {
      result.current.updateFavorite('สวัสดี', 'again');
    });

    const word = result.current.favorites[0];
    expect(word.repetition).toBe(0);
    expect(word.interval).toBe(1);
  });

  it('should calculate interval correctly for multiple repetitions', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    // First repetition: interval = 1
    act(() => {
      result.current.updateFavorite('สวัสดี', 'good');
    });
    expect(result.current.favorites[0].interval).toBe(1);

    // Second repetition: interval = 6
    act(() => {
      result.current.updateFavorite('สวัสดี', 'good');
    });
    expect(result.current.favorites[0].interval).toBe(6);

    // Third repetition: interval = ceil(6 * 2.5) = 15
    act(() => {
      result.current.updateFavorite('สวัสดี', 'good');
    });
    expect(result.current.favorites[0].interval).toBe(15);
  });

  it('should count words in review queue', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    // Add word with past review date
    act(() => {
      result.current.addFavorite(mockWord);
    });

    // Word should be in review queue (nextReviewDate is today)
    expect(result.current.reviewQueueCount).toBe(1);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockWord);
    });

    const stored = localStorage.getItem('favoriteWords-v2');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].thai).toBe('สวัสดี');
  });

  it('should load favorites from localStorage', () => {
    const storedFavorites = [
      {
        thai: 'สวัสดี',
        pronunciation: 'sa-wat-dee',
        japanese: 'こんにちは',
        repetition: 1,
        interval: 1,
        easeFactor: 2.5,
        nextReviewDate: new Date().toISOString(),
      },
    ];

    localStorage.setItem('favoriteWords-v2', JSON.stringify(storedFavorites));

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].thai).toBe('สวัสดี');
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useFavorites());
    }).toThrow('useFavorites must be used within a FavoritesProvider');
  });
});
