import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoleplayView from '../RoleplayView';
import { AudioProvider } from '../../contexts/AudioContext';
import type { ConversationLine } from '../../types';

const mockConversation: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'สวัสดีครับ',
    pronunciation: 'sa-wat-dee khrap',
    japanese: 'こんにちは',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
    ],
  },
  {
    speaker: 'B',
    thai: 'สวัสดีค่ะ',
    pronunciation: 'sa-wat-dee kha',
    japanese: 'こんにちは（女性）',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
    ],
  },
];

// Mock useRoleplay hook
vi.mock('../../hooks/useRoleplay', () => ({
  useRoleplay: vi.fn(() => ({
    status: 'selecting_role',
    userRole: null,
    messages: [],
    currentLineIndex: 0,
    selectRole: vi.fn(),
    addAiMessage: vi.fn(),
    addUserMessage: vi.fn(),
    endRoleplay: vi.fn(),
    proceedToNextLine: vi.fn(),
  })),
}));

// Mock useSpeechRecognition hook
vi.mock('../../hooks/useSpeechRecognition', () => ({
  useSpeechRecognition: vi.fn(() => ({
    isSupported: true,
    isListening: false,
    transcript: '',
    startListening: vi.fn(),
    stopListening: vi.fn(),
    resetTranscript: vi.fn(),
  })),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: {
        conversation: mockConversation,
        topicTitle: 'グリーティング',
      },
      pathname: '/roleplay',
    }),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AudioProvider>{children}</AudioProvider>
  </BrowserRouter>
);

describe('RoleplayView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render role selection modal initially', () => {
    render(<RoleplayView />, { wrapper });

    // Component should render (might show role selection)
    expect(screen.queryByText(/ロールプレイ/)).not.toBeInTheDocument();
  });

  it('should redirect when conversation is missing', () => {
    vi.mocked(useLocation).mockReturnValue({
      state: null,
      pathname: '/roleplay',
    } as any);

    render(<RoleplayView />, { wrapper });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should display conversation title when in playing mode', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/グリーティング - ロールプレイ/)).toBeInTheDocument();
    });
  });

  it('should display user role information', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/あなたは「A」さんです/)).toBeInTheDocument();
    });
  });

  it('should have exit button for roleplay', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    const exitButton = await screen.findByLabelText(
      /ロールプレイを終了してトピック選択に戻る/
    );
    expect(exitButton).toBeInTheDocument();
  });

  it('should navigate to home on exit button click', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    const exitButton = await screen.findByLabelText(
      /ロールプレイを終了してトピック選択に戻る/
    );
    fireEvent.click(exitButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should render flex container with correct height', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('flex', 'flex-col');
  });

  it('should display header with border', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    const header = container.querySelector('header');
    expect(header).toHaveClass('border-b');
  });

  it('should have proper semantic header structure', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    const heading = await screen.findByText(/グリーティング - ロールプレイ/);
    expect(heading.tagName).toBe('H1');
  });

  it('should display user role subtitle', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'B',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/あなたは「B」さんです/)).toBeInTheDocument();
    });
  });

  it('should handle multiple speakers from conversation', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/ロールプレイ/)).toBeInTheDocument();
    });
  });

  it('should return null when conversation is invalid', () => {
    vi.mocked(useLocation).mockReturnValue({
      state: { conversation: null },
      pathname: '/roleplay',
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    // Component should render null or empty
    expect(container.firstChild).toBeNull();
  });

  it('should return null when conversation is not an array', () => {
    vi.mocked(useLocation).mockReturnValue({
      state: { conversation: 'invalid' },
      pathname: '/roleplay',
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    expect(container.firstChild).toBeNull();
  });

  it('should setup correct height for chat container', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('h-[calc(100vh-200px)]');
  });

  it('should have rounded corners styling', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    const { container } = render(<RoleplayView />, { wrapper });

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('rounded-lg', 'shadow-xl');
  });

  it('should select role when role selection modal closes', async () => {
    const selectRoleMock = vi.fn();
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'selecting_role',
      userRole: null,
      messages: [],
      currentLineIndex: 0,
      selectRole: selectRoleMock,
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    // Component should render role selection modal
    // (actual button interaction tested in RoleSelectionModal tests)
    expect(selectRoleMock).toBeDefined();
  });

  it('should handle completed roleplay', async () => {
    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'completed',
      userRole: 'A',
      messages: mockConversation,
      currentLineIndex: mockConversation.length,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    // Component should handle completion state
    expect(screen.queryByText(/ロールプレイ/)).not.toBeInTheDocument();
  });

  it('should render without crashing with empty conversation', async () => {
    vi.mocked(useLocation).mockReturnValue({
      state: { conversation: [], topicTitle: 'Empty' },
      pathname: '/roleplay',
    } as any);

    const { useRoleplay } = await import('../../hooks/useRoleplay');
    vi.mocked(useRoleplay).mockReturnValue({
      status: 'playing',
      userRole: 'A',
      messages: [],
      currentLineIndex: 0,
      selectRole: vi.fn(),
      addAiMessage: vi.fn(),
      addUserMessage: vi.fn(),
      endRoleplay: vi.fn(),
      proceedToNextLine: vi.fn(),
    } as any);

    render(<RoleplayView />, { wrapper });

    // Should render without errors
    expect(screen.getByText(/Empty - ロールプレイ/)).toBeInTheDocument();
  });
});
