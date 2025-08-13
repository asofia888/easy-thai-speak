
export interface Word {
    thai: string;
    pronunciation: string;
    japanese: string;
}

export interface FavoriteWord extends Word {
    repetition: number;
    interval: number;
    easeFactor: number;
    nextReviewDate: string; // ISO string for the date
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
    level: 'Beginner' | 'Intermediate' | 'Advanced';
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

// Added for RoleplayView refactoring
export interface Message {
    id: string; // Added for unique identification
    speaker: string;
    text: string; // For user, this is the transcript. For AI, it's the thai phrase.
    isUser: boolean;
    pronunciation?: string; // For AI
    
    // For user messages
    correctPhrase?: string;
    correctPronunciation?: string;
    feedback?: Feedback;
    isFeedbackLoading?: boolean;
    feedbackError?: string;
}