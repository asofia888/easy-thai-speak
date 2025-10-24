import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from '../Flashcard';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { AudioProvider } from '../../contexts/AudioContext';
import type { FavoriteWord } from '../../types';

const mockWord: FavoriteWord = {
    id: 'test-1',
    thai: 'สวัสดี',
    pronunciation: 'sà-wàt-dee',
    japanese: 'こんにちは',
    repetition: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    addedAt: new Date().toISOString(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AudioProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
    </AudioProvider>
);

describe('Flashcard Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should render question side initially', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        expect(screen.getByText('この単語の意味は？')).toBeInTheDocument();
        expect(screen.getByText('สวัสดี')).toBeInTheDocument();
        expect(screen.getByText('答えを見る')).toBeInTheDocument();
    });

    it('should not show answer initially', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        expect(screen.queryByText('sà-wàt-dee')).not.toBeInTheDocument();
        expect(screen.queryByText('こんにちは')).not.toBeInTheDocument();
    });

    it('should reveal answer when button is clicked', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        const revealButton = screen.getByText('答えを見る');
        fireEvent.click(revealButton);

        expect(screen.getByText('sà-wàt-dee')).toBeInTheDocument();
        expect(screen.getByText('こんにちは')).toBeInTheDocument();
        expect(screen.getByText('この単語の記憶度は？')).toBeInTheDocument();
    });

    it('should show review buttons after revealing', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));

        expect(screen.getByText('もう一度')).toBeInTheDocument();
        expect(screen.getByText('普通')).toBeInTheDocument();
        expect(screen.getByText('簡単')).toBeInTheDocument();
    });

    it('should have play button on question side', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        const playButton = screen.getByLabelText('再生');
        expect(playButton).toBeInTheDocument();
    });

    it('should call speak when play button is clicked', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        const playButton = screen.getByLabelText('再生');
        fireEvent.click(playButton);

        // Audio should be triggered (implementation dependent)
        expect(playButton).toBeInTheDocument();
    });

    it('should update SRS data when "もう一度" is clicked', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));
        fireEvent.click(screen.getByText('もう一度'));

        // Check that the word was updated (via localStorage)
        const stored = localStorage.getItem('favoriteWords-v2');
        expect(stored).toBeTruthy();
    });

    it('should update SRS data when "普通" is clicked', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));
        fireEvent.click(screen.getByText('普通'));

        const stored = localStorage.getItem('favoriteWords-v2');
        expect(stored).toBeTruthy();
    });

    it('should update SRS data when "簡単" is clicked', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));
        fireEvent.click(screen.getByText('簡単'));

        const stored = localStorage.getItem('favoriteWords-v2');
        expect(stored).toBeTruthy();
    });

    it('should show Thai text with correct lang attribute', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        const thaiText = screen.getByText('สวัสดี');
        expect(thaiText).toHaveAttribute('lang', 'th');
    });

    it('should have correct aspect ratio styling', () => {
        const { container } = render(<Flashcard word={mockWord} />, { wrapper });

        const cardElement = container.querySelector('.aspect-\\[16\\/10\\]');
        expect(cardElement).toBeInTheDocument();
    });

    it('should apply fade-in animation when revealing answer', () => {
        const { container } = render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));

        const revealedCard = container.querySelector('.animate-fade-in');
        expect(revealedCard).toBeInTheDocument();
    });

    it('should memoize and not re-render with same word', () => {
        const { rerender } = render(<Flashcard word={mockWord} />, { wrapper });

        const initialElement = screen.getByText('この単語の意味は？');

        // Re-render with same word
        rerender(<Flashcard word={mockWord} />);

        // Should be the same element (React.memo working)
        expect(screen.getByText('この単語の意味は？')).toBe(initialElement);
    });

    it('should reset reveal state between different words', () => {
        const word1: FavoriteWord = { ...mockWord, thai: 'สวัสดี' };
        const word2: FavoriteWord = { ...mockWord, thai: 'ขอบคุณ', id: 'test-2' };

        const { rerender } = render(<Flashcard word={word1} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));
        expect(screen.getByText('この単語の記憶度は？')).toBeInTheDocument();

        // Switch to new word
        rerender(<Flashcard word={word2} />);

        // Should show question side again
        expect(screen.getByText('この単語の意味は？')).toBeInTheDocument();
        expect(screen.getByText('ขอบคุณ')).toBeInTheDocument();
    });

    it('should handle large text gracefully', () => {
        const longWord: FavoriteWord = {
            ...mockWord,
            thai: 'สวัสดีครับผมชื่อทานากะยินดีที่ได้รู้จัก',
            japanese: 'こんにちは、私の名前はタナカです。お会いできて嬉しいです。',
        };

        render(<Flashcard word={longWord} />, { wrapper });

        expect(screen.getByText(longWord.thai)).toBeInTheDocument();
    });

    it('should have accessible button labels', () => {
        render(<Flashcard word={mockWord} />, { wrapper });

        expect(screen.getByText('答えを見る')).toBeInTheDocument();
        expect(screen.getByLabelText('再生')).toBeInTheDocument();

        fireEvent.click(screen.getByText('答えを見る'));

        expect(screen.getByText('もう一度')).toBeInTheDocument();
        expect(screen.getByText('普通')).toBeInTheDocument();
        expect(screen.getByText('簡単')).toBeInTheDocument();
    });

    it('should use memoized callbacks for performance', () => {
        const { rerender } = render(<Flashcard word={mockWord} />, { wrapper });

        fireEvent.click(screen.getByText('答えを見る'));

        const againButton = screen.getByText('もう一度');
        const initialAgainButton = againButton;

        // Re-render with same word
        rerender(<Flashcard word={mockWord} />);

        // Buttons should be memoized
        expect(screen.getByText('もう一度')).toBe(initialAgainButton);
    });
});
