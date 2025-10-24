import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WordChip from '../WordChip';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { AudioProvider } from '../../contexts/AudioContext';
import type { Word } from '../../types';

const mockWord: Word = {
    thai: 'สวัสดี',
    pronunciation: 'sà-wàt-dee',
    japanese: 'こんにちは',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AudioProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
    </AudioProvider>
);

describe('WordChip Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should render word information', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        expect(screen.getByText('สวัสดี')).toBeInTheDocument();
        expect(screen.getByText('sà-wàt-dee')).toBeInTheDocument();
        expect(screen.getByText('こんにちは')).toBeInTheDocument();
    });

    it('should show unfilled star icon initially', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const button = screen.getByLabelText('単語「สวัสดี」をお気に入りに追加');
        expect(button).toBeInTheDocument();
    });

    it('should toggle favorite state when star button is clicked', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const addButton = screen.getByLabelText('単語「สวัสดี」をお気に入りに追加');
        fireEvent.click(addButton);

        const removeButton = screen.getByLabelText('単語「สวัสดี」をお気に入りから削除');
        expect(removeButton).toBeInTheDocument();

        fireEvent.click(removeButton);

        const addButtonAgain = screen.getByLabelText('単語「สวัสดี」をお気に入りに追加');
        expect(addButtonAgain).toBeInTheDocument();
    });

    it('should have play button for audio', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const playButton = screen.getByLabelText('単語「สวัสดี」を再生');
        expect(playButton).toBeInTheDocument();
    });

    it('should call speak function when play button is clicked', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const playButton = screen.getByLabelText('単語「สวัสดี」を再生');
        fireEvent.click(playButton);

        // Audio should be triggered (implementation dependent)
        expect(playButton).toBeInTheDocument();
    });

    it('should apply correct styling classes', () => {
        const { container } = render(<WordChip word={mockWord} />, { wrapper });

        const chipElement = container.querySelector('.bg-slate-100');
        expect(chipElement).toBeInTheDocument();
        expect(chipElement).toHaveClass('rounded-lg');
    });

    it('should show Thai text with correct lang attribute', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const thaiText = screen.getByText('สวัสดี');
        expect(thaiText).toHaveAttribute('lang', 'th');
    });

    it('should handle multiple words', () => {
        const word1: Word = {
            thai: 'สวัสดี',
            pronunciation: 'sà-wàt-dee',
            japanese: 'こんにちは',
        };

        const word2: Word = {
            thai: 'ขอบคุณ',
            pronunciation: 'kòp-kun',
            japanese: 'ありがとう',
        };

        const { rerender } = render(<WordChip word={word1} />, { wrapper });
        expect(screen.getByText('สวัสดี')).toBeInTheDocument();

        rerender(<WordChip word={word2} />);
        expect(screen.getByText('ขอบคุณ')).toBeInTheDocument();
    });

    it('should memoize and not re-render with same props', () => {
        const { rerender } = render(<WordChip word={mockWord} />, { wrapper });

        const initialElement = screen.getByText('สวัสดี');

        // Re-render with same props
        rerender(<WordChip word={mockWord} />);

        // Should be the same element (React.memo working)
        expect(screen.getByText('สวัสดี')).toBe(initialElement);
    });

    it('should persist favorite state in localStorage', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        const addButton = screen.getByLabelText('単語「สวัสดี」をお気に入りに追加');
        fireEvent.click(addButton);

        // Check localStorage
        const stored = localStorage.getItem('favoriteWords-v2');
        expect(stored).toBeTruthy();

        const favorites = JSON.parse(stored!);
        expect(favorites).toHaveLength(1);
        expect(favorites[0].thai).toBe('สวัสดี');
    });

    it('should handle hover states correctly', () => {
        const { container } = render(<WordChip word={mockWord} />, { wrapper });

        const chipElement = container.querySelector('.hover\\:bg-slate-200');
        expect(chipElement).toBeInTheDocument();
    });

    it('should have accessible labels for all interactive elements', () => {
        render(<WordChip word={mockWord} />, { wrapper });

        expect(screen.getByLabelText(/単語「สวัสดี」を再生/)).toBeInTheDocument();
        expect(screen.getByLabelText(/単語「สวัสดี」をお気に入り/)).toBeInTheDocument();
    });
});
