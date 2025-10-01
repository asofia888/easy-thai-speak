import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConversationCard from './ConversationCard';
import { AudioProvider } from '../contexts/AudioContext';
import { ConversationLine } from '../types';

const mockLine: ConversationLine = {
  speaker: 'A',
  thai: 'สวัสดีครับ',
  pronunciation: 'sa-wat-dee khrap',
  japanese: 'こんにちは',
  words: [
    {
      thai: 'สวัสดี',
      pronunciation: 'sa-wat-dee',
      japanese: 'こんにちは',
    },
    {
      thai: 'ครับ',
      pronunciation: 'khrap',
      japanese: '(丁寧語)',
    },
  ],
};

const mockLineWithGrammar: ConversationLine = {
  ...mockLine,
  grammarPoint: {
    title: '丁寧語の使い方',
    explanation: 'ครับ は男性が使う丁寧語です',
    examples: [
      {
        thai: 'ขอบคุณครับ',
        pronunciation: 'khop-khun khrap',
        japanese: 'ありがとうございます',
      },
    ],
  },
};

const renderWithAudioContext = (component: React.ReactElement) => {
  return render(<AudioProvider>{component}</AudioProvider>);
};

describe('ConversationCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render conversation line content', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    expect(screen.getByText('sa-wat-dee khrap')).toBeInTheDocument();
    expect(screen.getByText('こんにちは')).toBeInTheDocument();
  });

  it('should display speaker initial', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('should render all word chips', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    expect(screen.getByText('สวัสดี')).toBeInTheDocument();
    expect(screen.getByText('ครับ')).toBeInTheDocument();
  });

  it('should show play button', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    const playButton = screen.getByLabelText('「สวัสดีครับ」を再生');
    expect(playButton).toBeInTheDocument();
  });

  it('should hide translation in listening mode by default', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={true} />);

    expect(screen.queryByText('こんにちは')).not.toBeInTheDocument();
    expect(screen.getByText('訳を表示')).toBeInTheDocument();
  });

  it('should show translation when clicking "訳を表示" in listening mode', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={true} />);

    const showButton = screen.getByText('訳を表示');
    fireEvent.click(showButton);

    expect(screen.getByText('こんにちは')).toBeInTheDocument();
    expect(screen.getByText('訳を隠す')).toBeInTheDocument();
  });

  it('should hide translation when clicking "訳を隠す"', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={true} />);

    // Show translation first
    const showButton = screen.getByText('訳を表示');
    fireEvent.click(showButton);

    // Then hide it
    const hideButton = screen.getByText('訳を隠す');
    fireEvent.click(hideButton);

    expect(screen.queryByText('こんにちは')).not.toBeInTheDocument();
    expect(screen.getByText('訳を表示')).toBeInTheDocument();
  });

  it('should always show translation in non-listening mode', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    expect(screen.getByText('こんにちは')).toBeInTheDocument();
    expect(screen.queryByText('訳を表示')).not.toBeInTheDocument();
  });

  it('should show grammar button when grammarPoint exists', () => {
    renderWithAudioContext(<ConversationCard line={mockLineWithGrammar} isListeningMode={false} />);

    const grammarButton = screen.getByLabelText('文法解説を見る');
    expect(grammarButton).toBeInTheDocument();
  });

  it('should not show grammar button when grammarPoint is missing', () => {
    renderWithAudioContext(<ConversationCard line={mockLine} isListeningMode={false} />);

    const grammarButton = screen.queryByLabelText('文法解説を見る');
    expect(grammarButton).not.toBeInTheDocument();
  });

  it('should open grammar modal when clicking grammar button', () => {
    renderWithAudioContext(<ConversationCard line={mockLineWithGrammar} isListeningMode={false} />);

    const grammarButton = screen.getByLabelText('文法解説を見る');
    fireEvent.click(grammarButton);

    expect(screen.getByText('丁寧語の使い方')).toBeInTheDocument();
  });

  it('should reset translation visibility when isListeningMode changes', () => {
    const { rerender } = renderWithAudioContext(
      <ConversationCard line={mockLine} isListeningMode={true} />
    );

    // Show translation
    const showButton = screen.getByText('訳を表示');
    fireEvent.click(showButton);
    expect(screen.getByText('こんにちは')).toBeInTheDocument();

    // Toggle listening mode
    rerender(
      <AudioProvider>
        <ConversationCard line={mockLine} isListeningMode={false} />
      </AudioProvider>
    );

    // Translation should be visible in normal mode
    expect(screen.getByText('こんにちは')).toBeInTheDocument();
  });
});
