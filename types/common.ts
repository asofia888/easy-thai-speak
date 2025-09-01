// Common utility types for better type safety and reusability

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  meta?: {
    cached: boolean;
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Generic async state for hooks
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

/**
 * Component props for interactive elements
 */
export interface InteractiveProps {
  onClick?: () => void;
  onDoubleClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Base component props
 */
export interface BaseComponentProps {
  className?: string;
  testId?: string;
  ariaLabel?: string;
}

/**
 * Generic list item component props
 */
export interface ListItemProps<T> extends BaseComponentProps, InteractiveProps {
  data: T;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

/**
 * Audio-related types
 */
export interface AudioState {
  isPlaying: boolean;
  isRecording: boolean;
  volume: number;
  duration?: number;
  currentTime?: number;
}

export interface AudioOptions {
  volume?: number;
  playbackRate?: number;
  loop?: boolean;
  autoplay?: boolean;
}

/**
 * Speech recognition result
 */
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  alternatives?: Array<{
    transcript: string;
    confidence: number;
  }>;
}

/**
 * Pitch analysis result
 */
export interface PitchAnalysisResult {
  fundamentalFrequency: number;
  tone: ThaiTone;
  confidence: number;
  timePoints: Array<{
    time: number;
    frequency: number;
  }>;
}

/**
 * Thai language specific types
 */
export type ThaiTone = 'mid' | 'low' | 'falling' | 'high' | 'rising';

export interface ThaiPhoneme {
  symbol: string;
  ipa: string;
  tone?: ThaiTone;
}

/**
 * Learning progress tracking
 */
export interface LearningProgress {
  wordsLearned: number;
  conversationsCompleted: number;
  totalStudyTime: number; // in minutes
  streak: number; // consecutive days
  level: LearningLevel;
  badges: Badge[];
}

export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

/**
 * Settings and preferences
 */
export interface UserPreferences {
  language: 'ja' | 'en' | 'th';
  theme: 'light' | 'dark' | 'auto';
  autoPlay: boolean;
  playbackSpeed: number;
  showPronunciation: boolean;
  showTranslation: boolean;
  enableNotifications: boolean;
  studyReminders: StudyReminder[];
}

export interface StudyReminder {
  id: string;
  time: string; // HH:MM format
  days: WeekDay[];
  enabled: boolean;
}

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Storage keys enum for consistent local storage access
 */
export enum StorageKeys {
  FAVORITES = 'thai-speak-favorites',
  PREFERENCES = 'thai-speak-preferences',
  PROGRESS = 'thai-speak-progress',
  CUSTOM_TOPICS = 'thai-speak-custom-topics',
  CONVERSATION_HISTORY = 'thai-speak-conversation-history'
}

/**
 * Event types for analytics/tracking
 */
export interface AnalyticsEvent {
  type: EventType;
  category: EventCategory;
  data?: Record<string, any>;
  timestamp: Date;
}

export type EventType = 
  | 'conversation_started'
  | 'conversation_completed'
  | 'word_favorited'
  | 'word_unfavorited'
  | 'pronunciation_practiced'
  | 'grammar_viewed'
  | 'settings_changed';

export type EventCategory = 'learning' | 'interaction' | 'navigation' | 'system';

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Form validation types
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}