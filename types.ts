
import { LearningLevel, ThaiTone, BaseComponentProps, InteractiveProps } from './types/common';

export interface Word {
    thai: string;
    pronunciation: string;
    japanese: string;
    tone?: ThaiTone;
    partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'particle';
}

export interface FavoriteWord extends Word {
    id: string; // Added for better tracking
    repetition: number;
    interval: number;
    easeFactor: number;
    nextReviewDate: string; // ISO string for the date
    addedAt: string; // ISO string for when it was favorited
    lastReviewed?: string; // ISO string for last review
}

export interface ExampleSentence {
    thai: string;
    pronunciation: string;
    japanese: string;
}

export interface GrammarPoint {
    title: string;
    explanation: string;
    examples: ExampleSentence[];
}

export interface ConversationLine {
    speaker: string;
    thai: string;
    pronunciation: string;
    japanese: string;
    words: Word[];
    grammarPoint?: GrammarPoint;
}

export interface ConversationTopic {
    id: string;
    title: string;
    description: string;
    level: LearningLevel;
    tags?: string[];
    estimatedDuration?: number; // in minutes
    difficulty?: number; // 1-5 scale
}

export interface TopicCategory {
    name: string;
    topics: ConversationTopic[];
}

export interface CustomTopicHistoryItem {
  id: string;
  title: string;
  createdAt: string; // ISO string
}

export interface Feedback {
    score: number;
    text: string;
    is_correct: boolean;
}

// Enhanced Message interface for roleplay functionality
export interface Message {
    id: string;
    speaker: string;
    text: string; // For user: transcript; For AI: thai phrase
    isUser: boolean;
    timestamp: Date;
    pronunciation?: string; // For AI messages
    
    // User message specific fields
    correctPhrase?: string;
    correctPronunciation?: string;
    feedback?: Feedback;
    isFeedbackLoading?: boolean;
    feedbackError?: string;
    
    // Audio related
    audioUrl?: string;
    audioDuration?: number;
}

// Component Props Types (utilizing common types)
export interface ConversationCardProps extends BaseComponentProps {
    line: ConversationLine;
    isListeningMode: boolean;
}

export interface WordChipProps extends BaseComponentProps, InteractiveProps {
    word: Word;
    isSelected?: boolean;
    showPronunciation?: boolean;
}

export interface FlashcardProps extends BaseComponentProps, InteractiveProps {
    word: FavoriteWord;
    showAnswer: boolean;
    onAnswer: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

// Export commonly used union types
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';