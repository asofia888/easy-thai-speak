
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { Word, FavoriteWord } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PerformanceRating = 'again' | 'good' | 'easy';

interface FavoritesContextType {
    favorites: FavoriteWord[];
    reviewQueueCount: number;
    addFavorite: (word: Word) => void;
    removeFavorite: (thai: string) => void;
    updateFavorite: (thai: string, performance: PerformanceRating) => void;
    isFavorite: (thai: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useLocalStorage<FavoriteWord[]>('favoriteWords-v2', []);

    const reviewQueueCount = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return favorites.filter(f => new Date(f.nextReviewDate) <= today).length;
    }, [favorites]);

    const addFavorite = (word: Word) => {
        setFavorites(prev => {
            if (prev.some(fav => fav.thai === word.thai)) return prev;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const newFavorite: FavoriteWord = {
                ...word,
                id: `${word.thai}-${Date.now()}`,
                repetition: 0,
                interval: 0,
                easeFactor: 2.5,
                nextReviewDate: today.toISOString(),
                addedAt: new Date().toISOString(),
            };
            return [...prev, newFavorite].sort((a, b) => a.thai.localeCompare(b.thai, 'th'));
        });
    };

    const removeFavorite = (thai: string) => {
        setFavorites(prev => prev.filter(fav => fav.thai !== thai));
    };

    const isFavorite = (thai: string) => {
        return favorites.some(fav => fav.thai === thai);
    };

    const updateFavorite = (thai: string, performance: PerformanceRating) => {
        setFavorites(prev => {
            const word = prev.find(f => f.thai === thai);
            if (!word) return prev;

            let { repetition, interval, easeFactor } = word;

            if (performance === 'again') {
                repetition = 0;
                interval = 1;
            } else {
                repetition += 1;
                if (repetition === 1) {
                    interval = 1;
                } else if (repetition === 2) {
                    interval = 6;
                } else {
                    interval = Math.ceil(interval * easeFactor);
                }

                if (performance === 'easy') {
                    easeFactor += 0.15;
                }
            }

            const newNextReviewDate = new Date();
            newNextReviewDate.setDate(newNextReviewDate.getDate() + interval);
            newNextReviewDate.setHours(0, 0, 0, 0);

            const updatedWord: FavoriteWord = {
                ...word,
                repetition,
                interval,
                easeFactor,
                nextReviewDate: newNextReviewDate.toISOString(),
            };

            return prev.map(f => (f.thai === thai ? updatedWord : f));
        });
    };


    return (
        <FavoritesContext.Provider value={{ favorites, reviewQueueCount, addFavorite, removeFavorite, isFavorite, updateFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};