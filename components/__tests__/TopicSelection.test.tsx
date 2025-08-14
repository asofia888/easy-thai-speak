import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TopicSelection from '../TopicSelection';

// Mock the router hooks
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Test wrapper
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('TopicSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('renders main heading and description', () => {
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    expect(screen.getByText('会話トピックを選ぼう')).toBeInTheDocument();
    expect(screen.getByText(/3000語の習得を目指して/)).toBeInTheDocument();
  });




  it('renders custom topic generator', () => {
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    expect(screen.getByText('カスタムトピック')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/興味のあるトピック/)).toBeInTheDocument();
  });

  it('handles custom topic creation', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText(/興味のあるトピック/);
    const generateButton = screen.getByText('会話を生成');

    await user.type(input, 'カスタムテストトピック');
    await user.click(generateButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(/\/conversation\/custom-\d+/),
      { state: { topicTitle: 'カスタムテストトピック' } }
    );
  });

  it('does not generate empty custom topic', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const generateButton = screen.getByText('会話を生成');
    await user.click(generateButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders topic categories and cards', () => {
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    // Check for category headers
    expect(screen.getByText('初級者向け')).toBeInTheDocument();
    expect(screen.getByText('中級者向け')).toBeInTheDocument();
    expect(screen.getByText('上級者向け')).toBeInTheDocument();

    // Check for some topic cards
    expect(screen.getByText('レストランでの注文')).toBeInTheDocument();
    expect(screen.getByText('道案内')).toBeInTheDocument();
  });

  it('navigates to conversation when topic card is clicked', () => {
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const topicCard = screen.getByText('レストランでの注文');
    fireEvent.click(topicCard.closest('button')!);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/conversation/restaurant-ordering',
      { state: { topicTitle: 'レストランでの注文' } }
    );
  });

  it('shows cached indicator for cached conversations', () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'conversation-restaurant-ordering') {
        return JSON.stringify({ some: 'data' });
      }
      return null;
    });

    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    // Check for cloud icon indicating cached content
    expect(screen.getByTitle('オフラインで利用可能')).toBeInTheDocument();
  });

  it('displays custom topic history when available', () => {
    const mockHistory = JSON.stringify([
      {
        id: 'custom-123',
        title: 'テスト履歴トピック',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ]);
    
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'customTopicHistory') {
        return mockHistory;
      }
      return null;
    });

    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    expect(screen.getByText('カスタムトピックの履歴')).toBeInTheDocument();
    expect(screen.getByText('テスト履歴トピック')).toBeInTheDocument();
  });

  it('handles history item deletion', async () => {
    const user = userEvent.setup();
    const mockHistory = [
      {
        id: 'custom-123',
        title: 'テスト履歴トピック',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockHistory));

    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const deleteButton = screen.getByLabelText('履歴「テスト履歴トピック」を削除');
    await user.click(deleteButton);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'customTopicHistory',
      JSON.stringify([])
    );
  });

  it('clears all history when requested', async () => {
    const user = userEvent.setup();
    global.confirm = jest.fn(() => true);
    
    const mockHistory = [
      {
        id: 'custom-123',
        title: 'テスト履歴トピック',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockHistory));

    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const clearAllButton = screen.getByText('すべて削除');
    await user.click(clearAllButton);

    expect(global.confirm).toHaveBeenCalledWith(
      '本当にすべてのカスタムトピック履歴を削除しますか？'
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'customTopicHistory',
      JSON.stringify([])
    );
  });

  it('does not clear history when user cancels', async () => {
    const user = userEvent.setup();
    global.confirm = jest.fn(() => false);
    
    const mockHistory = [
      {
        id: 'custom-123',
        title: 'テスト履歴トピック',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockHistory));

    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    const clearAllButton = screen.getByText('すべて削除');
    await user.click(clearAllButton);

    expect(global.confirm).toHaveBeenCalled();
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
  });

  it('shows correct level badges for topics', () => {
    render(
      <TestWrapper>
        <TopicSelection />
      </TestWrapper>
    );

    expect(screen.getAllByText('Beginner')).toHaveLength(8); // 8 beginner topics
    expect(screen.getAllByText('Intermediate')).toHaveLength(10); // 10 intermediate topics
    expect(screen.getAllByText('Advanced')).toHaveLength(8); // 8 advanced topics
  });
});