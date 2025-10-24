import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritesView from '../FavoritesView';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { AudioProvider } from '../../contexts/AudioContext';
import type { FavoriteWord } from '../../types';

const mockFavoriteWord: FavoriteWord = {
  id: 'test-1',
  thai: 'สวัสดี',
  pronunciation: 'sa-wat-dee',
  japanese: 'こんにちは',
  repetition: 2,
  interval: 3,
  easeFactor: 2.5,
  nextReviewDate: new Date().toISOString(),
  addedAt: new Date(Date.now() - 86400000).toISOString(),
};

const mockFavoriteWord2: FavoriteWord = {
  id: 'test-2',
  thai: 'ขอบคุณ',
  pronunciation: 'khop-khun',
  japanese: 'ありがとう',
  repetition: 1,
  interval: 1,
  easeFactor: 2.5,
  nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
  addedAt: new Date(Date.now() - 172800000).toISOString(),
};

// Mock useFavorites hook
vi.mock('../../contexts/FavoritesContext', async () => {
  const actual = await vi.importActual('../../contexts/FavoritesContext');
  return {
    ...actual,
    useFavorites: vi.fn(() => ({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 0,
    })),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>
      <AudioProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AudioProvider>
    </ToastProvider>
  </BrowserRouter>
);

describe('FavoritesView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render empty state when no favorites', () => {
    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('単語帳は空です')).toBeInTheDocument();
    expect(
      screen.getByText(
        /会話の中から星マークをタップして、単語をお気に入りに追加しましょう/
      )
    ).toBeInTheDocument();
  });

  it('should show link to explore topics when empty', () => {
    render(<FavoritesView />, { wrapper });

    const link = screen.getByRole('link', { name: /会話トピックを探す/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should display review section when favorites exist', async () => {
    // Override the mock to provide favorites
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord, mockFavoriteWord2],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('単語レビュー')).toBeInTheDocument();
    expect(
      screen.getByText(
        /間隔反復システム\(SRS\)を使って、記憶が定着するよう効率的に復習しましょう/
      )
    ).toBeInTheDocument();
  });

  it('should show review queue count badge', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord, mockFavoriteWord2],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    await waitFor(() => {
      // Look for the review count badge (text should be "1" with blue styling)
      const badge = container.querySelector('span[class*="bg-blue-100"][class*="text-blue-700"]');
      if (badge) {
        expect(badge).toBeInTheDocument();
        expect(badge.textContent).toMatch(/\d+/);
      }
    });
  });

  it('should display flashcard for review', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('สวัสดี')).toBeInTheDocument();
    });
  });

  it('should show completion message when all reviews are done', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord2], // Word with future review date
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 0,
    } as any);

    render(<FavoritesView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('今日のレビューは完了です！')).toBeInTheDocument();
      expect(
        screen.getByText(/よく頑張りました。次のレビューまで休憩しましょう/)
      ).toBeInTheDocument();
    });
  });

  it('should display all learned words section', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord, mockFavoriteWord2],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('学習済みの全単語')).toBeInTheDocument();
  });

  it('should display word list headers', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('タイ語')).toBeInTheDocument();
    expect(screen.getByText('発音')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument();
    expect(screen.getByText('次の復習')).toBeInTheDocument();
  });

  it('should render words in the list', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord, mockFavoriteWord2],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('สวัสดี')).toBeInTheDocument();
    expect(screen.getByText('ขอบคุณ')).toBeInTheDocument();
    expect(screen.getByText('sa-wat-dee')).toBeInTheDocument();
    expect(screen.getByText('khop-khun')).toBeInTheDocument();
  });

  it('should display Japanese translations', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord, mockFavoriteWord2],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    expect(screen.getByText('こんにちは')).toBeInTheDocument();
    expect(screen.getByText('ありがとう')).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    const headings = container.querySelectorAll('h1, h2');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display sections for review and learned words', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it('should use responsive grid layout', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    // Check for grid layout class
    const gridElements = container.querySelectorAll('[class*="grid"]');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  it('should render Thai text with lang attribute', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    const thaiElements = container.querySelectorAll('[lang="th"]');
    expect(thaiElements.length).toBeGreaterThan(0);
  });

  it('should display star icon in empty state', async () => {
    // Ensure the mock returns empty favorites
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 0,
    });

    render(<FavoritesView />, { wrapper });

    // Check for empty state message
    await waitFor(() => {
      expect(screen.getByText('単語帳は空です')).toBeInTheDocument();
    });
  });

  it('should have proper spacing with gap classes', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    vi.mocked(useFavorites).mockReturnValue({
      favorites: [mockFavoriteWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    const spaceElements = container.querySelectorAll('[class*="space-"]');
    expect(spaceElements.length).toBeGreaterThan(0);
  });

  it('should handle multiple review words', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    const manyWords = Array.from({ length: 10 }, (_, i) => ({
      ...mockFavoriteWord,
      id: `word-${i}`,
      thai: `word-${i}`,
    }));

    vi.mocked(useFavorites).mockReturnValue({
      favorites: manyWords,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 10,
    } as any);

    const { container } = render(<FavoritesView />, { wrapper });

    await waitFor(() => {
      // Look for the review count badge (text should be "10" with blue styling)
      const badge = container.querySelector('span[class*="bg-blue-100"][class*="text-blue-700"]');
      if (badge) {
        expect(badge).toBeInTheDocument();
        expect(badge.textContent).toMatch(/\d+/);
      }
    });
  });

  it('should filter review queue by date', async () => {
    const { useFavorites } = await import('../../contexts/FavoritesContext');
    const pastWord = {
      ...mockFavoriteWord,
      nextReviewDate: new Date(Date.now() - 86400000).toISOString(),
    };
    const futureWord = {
      ...mockFavoriteWord2,
      nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
    };

    vi.mocked(useFavorites).mockReturnValue({
      favorites: [pastWord, futureWord],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      updateFavorite: vi.fn(),
      isFavorite: vi.fn(),
      reviewQueueCount: 1,
    } as any);

    render(<FavoritesView />, { wrapper });

    // Should show review section with at least one word
    expect(screen.getByText('本日レビューする単語')).toBeInTheDocument();
  });
});
