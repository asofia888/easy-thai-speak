import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TopicSelection from './TopicSelection';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TopicSelection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render page title', () => {
    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('タイ語会話練習')).toBeInTheDocument();
  });

  it('should render custom topic generator', () => {
    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('カスタムトピックを生成')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('会話のテーマを入力...')).toBeInTheDocument();
  });

  it('should render topic categories', () => {
    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('日常会話')).toBeInTheDocument();
  });

  it('should enable submit button when input has text', () => {
    renderWithRouter(<TopicSelection />);

    const input = screen.getByPlaceholderText('会話のテーマを入力...');
    const submitButton = screen.getByRole('button', { name: /会話を生成/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'カスタムトピック' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('should navigate to conversation when custom topic is submitted', () => {
    renderWithRouter(<TopicSelection />);

    const input = screen.getByPlaceholderText('会話のテーマを入力...');
    const submitButton = screen.getByRole('button', { name: /会話を生成/i });

    fireEvent.change(input, { target: { value: 'カスタムトピック' } });
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(/^\/conversation\/custom-\d+$/),
      expect.objectContaining({
        state: { topicTitle: 'カスタムトピック' },
      })
    );
  });

  it('should clear input after submission', () => {
    renderWithRouter(<TopicSelection />);

    const input = screen.getByPlaceholderText('会話のテーマを入力...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test topic' } });
    expect(input.value).toBe('test topic');

    const form = input.closest('form');
    fireEvent.submit(form!);

    expect(input.value).toBe('');
  });

  it('should not submit when input is empty or only whitespace', () => {
    renderWithRouter(<TopicSelection />);

    const input = screen.getByPlaceholderText('会話のテーマを入力...');

    fireEvent.change(input, { target: { value: '   ' } });
    const form = input.closest('form');
    fireEvent.submit(form!);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should render roleplay mode button', () => {
    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('ロールプレイモード')).toBeInTheDocument();
  });

  it('should render favorites button', () => {
    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('お気に入り')).toBeInTheDocument();
  });

  it('should show custom topic history section when history exists', () => {
    const customHistory = [
      { id: 'custom-1', title: 'Test Topic 1', timestamp: Date.now() },
    ];
    localStorage.setItem('customTopicHistory', JSON.stringify(customHistory));

    renderWithRouter(<TopicSelection />);
    expect(screen.getByText('最近のカスタムトピック')).toBeInTheDocument();
    expect(screen.getByText('Test Topic 1')).toBeInTheDocument();
  });

  it('should navigate to topic when topic card is clicked', () => {
    renderWithRouter(<TopicSelection />);

    // Find and click the first topic card (assuming "挨拶" exists in constants)
    const topicCards = screen.getAllByRole('button');
    const firstTopicCard = topicCards.find(card =>
      card.getAttribute('aria-label')?.includes('トピック')
    );

    if (firstTopicCard) {
      fireEvent.click(firstTopicCard);
      expect(mockNavigate).toHaveBeenCalled();
    }
  });

  it('should show offline indicator for cached topics', () => {
    // Cache a topic
    localStorage.setItem('conversation-greetings', JSON.stringify([]));

    renderWithRouter(<TopicSelection />);

    // Check for cloud emoji (offline indicator)
    const offlineIndicators = screen.queryAllByTitle('オフラインで利用可能');
    expect(offlineIndicators.length).toBeGreaterThan(0);
  });

  it('should remove custom topic from history when delete button is clicked', () => {
    const customHistory = [
      { id: 'custom-1', title: 'Test Topic 1', timestamp: Date.now() },
      { id: 'custom-2', title: 'Test Topic 2', timestamp: Date.now() },
    ];
    localStorage.setItem('customTopicHistory', JSON.stringify(customHistory));

    renderWithRouter(<TopicSelection />);

    // Find delete buttons
    const deleteButtons = screen.getAllByLabelText(/削除/i);
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0]);

      // Verify topic was removed from localStorage
      const updatedHistory = JSON.parse(localStorage.getItem('customTopicHistory') || '[]');
      expect(updatedHistory).toHaveLength(1);
      expect(updatedHistory[0].title).toBe('Test Topic 2');
    }
  });
});
