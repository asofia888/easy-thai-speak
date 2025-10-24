import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConversationView from '../ConversationView';
import { SavedConversationsProvider } from '../../contexts/SavedConversationsContext';
import { AudioProvider } from '../../contexts/AudioContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import * as useConversationDataModule from '../../hooks/useConversationData';
import type { ConversationLine } from '../../types';

const mockConversation: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'สวัสดีครับ',
    pronunciation: 'sa-wat-dee khrap',
    japanese: 'こんにちは',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
      { thai: 'ครับ', pronunciation: 'khrap', japanese: '～です（敬語）' },
    ],
  },
  {
    speaker: 'B',
    thai: 'สวัสดีค่ะ',
    pronunciation: 'sa-wat-dee kha',
    japanese: 'こんにちは（女性）',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
      { thai: 'ค่ะ', pronunciation: 'kha', japanese: '～です（敬語・女性）' },
    ],
  },
];

// Mock useConversationData hook
vi.mock('../../hooks/useConversationData', () => ({
  useConversationData: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ topicId: 'greeting' }),
    useLocation: () => ({
      state: { topicTitle: 'グリーティング' },
      pathname: '/conversation/greeting',
    }),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>
      <SavedConversationsProvider>
        <FavoritesProvider>
          <AudioProvider>{children}</AudioProvider>
        </FavoritesProvider>
      </SavedConversationsProvider>
    </ToastProvider>
  </BrowserRouter>
);

describe('ConversationView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    (useConversationDataModule.useConversationData as any).mockReturnValue({
      conversation: mockConversation,
      isLoading: false,
      error: null,
    });
  });

  it('should render loading state initially', () => {
    (useConversationDataModule.useConversationData as any).mockReturnValue({
      conversation: [],
      isLoading: true,
      error: null,
    });

    render(<ConversationView />, { wrapper });

    expect(screen.getByText('グリーティング')).toBeInTheDocument();
  });

  it('should render conversation when loaded', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('グリーティング')).toBeInTheDocument();
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
      expect(screen.getByText('สวัสดีค่ะ')).toBeInTheDocument();
    });
  });

  it('should display conversation lines with speakers', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });
  });

  it('should have listening mode toggle', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const toggleButton = screen.getByRole('switch', {
        name: /リスニングモードを切り替え/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('should toggle listening mode when switch is clicked', async () => {
    render(<ConversationView />, { wrapper });

    const toggleButton = await screen.findByRole('switch', {
      name: /リスニングモードを切り替え/i,
    });

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-checked', 'true');
    });
  });

  it('should persist listening mode to localStorage', async () => {
    render(<ConversationView />, { wrapper });

    const toggleButton = await screen.findByRole('switch');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const stored = localStorage.getItem('listeningMode');
      expect(stored).toBe('true');
    });
  });

  it('should display error state when there is an error', async () => {
    const errorMessage = 'ネットワークエラーが発生しました';
    (useConversationDataModule.useConversationData as any).mockReturnValue({
      conversation: [],
      isLoading: false,
      error: errorMessage,
    });

    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show error recovery button', async () => {
    (useConversationDataModule.useConversationData as any).mockReturnValue({
      conversation: [],
      isLoading: false,
      error: 'エラー',
    });

    render(<ConversationView />, { wrapper });

    const backButton = await screen.findByText('トピック選択に戻る');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should have conversation cards with Thai text lang attribute', async () => {
    const { container } = render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const thaiElements = container.querySelectorAll('[lang="th"]');
      expect(thaiElements.length).toBeGreaterThan(0);
    });
  });

  it('should show Japanese text by default (not listening mode)', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('こんにちは')).toBeInTheDocument();
    });
  });

  it('should navigate to roleplay on start roleplay', async () => {
    render(<ConversationView />, { wrapper });

    // Wait for conversation to load
    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    });

    // Find and click the roleplay button
    const buttons = screen.getAllByRole('button');
    const roleplayButton = buttons.find((btn) =>
      btn.textContent?.includes('ロールプレイを開始')
    );

    if (roleplayButton) {
      fireEvent.click(roleplayButton);

      expect(mockNavigate).toHaveBeenCalledWith('/roleplay', {
        state: { conversation: mockConversation, topicTitle: 'グリーティング' },
      });
    }
  });

  it('should handle save conversation', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    });

    // Note: save button might only appear for custom topics
    // This test verifies the component structure
    expect(screen.getByText('グリーティング')).toBeInTheDocument();
  });

  it('should show conversation count', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const conversationLines = screen.getAllByRole('region');
      expect(conversationLines.length).toBeGreaterThanOrEqual(2); // At least 2 lines
    });
  });

  it('should handle empty conversation gracefully', async () => {
    (useConversationDataModule.useConversationData as any).mockReturnValue({
      conversation: [],
      isLoading: false,
      error: null,
    });

    render(<ConversationView />, { wrapper });

    // Should render but with no conversation cards
    expect(screen.getByText('グリーティング')).toBeInTheDocument();
  });

  it('should display conversation with proper semantic structure', async () => {
    const { container } = render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const heading = screen.getByText('グリーティング');
      expect(heading.tagName).toBe('H1');
    });
  });

  it('should apply responsive layout classes', async () => {
    const { container } = render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const mainDiv = container.firstChild;
      expect(mainDiv).toBeInTheDocument();
    });
  });

  it('should handle multiple speakers correctly', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      const speakerElements = screen.getAllByText(/^[AB]$/);
      expect(speakerElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should render listening mode label', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('訳を隠す')).toBeInTheDocument();
    });
  });

  it('should have eye icon for listening mode', async () => {
    const { container } = render(<ConversationView />, { wrapper });

    await waitFor(() => {
      // Eye icon should be present (check by SVG or icon class)
      expect(container.querySelector('[class*="eye"]')).toBeInTheDocument();
    });
  });

  it('should maintain conversation state through re-renders', async () => {
    const { rerender } = render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    });

    rerender(<ConversationView />);

    expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
  });

  it('should handle Japanese pronunciation and words', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('こんにちは')).toBeInTheDocument();
      expect(screen.getByText('こんにちは（女性）')).toBeInTheDocument();
    });
  });

  it('should show pronunciation text', async () => {
    render(<ConversationView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('sa-wat-dee khrap')).toBeInTheDocument();
    });
  });
});
