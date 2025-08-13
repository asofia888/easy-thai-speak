import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Mock Gemini service
jest.mock('../../services/geminiService', () => ({
  generateConversation: jest.fn(() => Promise.resolve({
    conversation: [
      {
        speaker: 'ai',
        thai: 'สวัสดีครับ',
        paiboon: 'sà-wàt-dii kráp',
        english: 'Hello',
        explanation: 'A polite greeting in Thai'
      }
    ]
  })),
  explainGrammar: jest.fn(() => Promise.resolve({
    explanation: 'This is a grammar explanation'
  }))
}));

// Mock speech synthesis
const mockSpeak = jest.fn();
jest.mock('../../hooks/useTextToSpeech', () => ({
  useTextToSpeech: () => ({
    speak: mockSpeak,
    isSpeaking: false,
    cancel: jest.fn(),
    isSupported: true
  })
}));

// Mock speech recognition
const mockStartListening = jest.fn();
const mockStopListening = jest.fn();
jest.mock('../../hooks/useSpeechRecognition', () => ({
  useSpeechRecognition: () => ({
    isSupported: true,
    isListening: false,
    transcript: '',
    startListening: mockStartListening,
    stopListening: mockStopListening,
    resetTranscript: jest.fn()
  })
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

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    
    // Mock window.confirm for deletion confirmations
    global.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders app and navigates through main flow', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Should render home page with topic selection
    expect(screen.getByText('会話トピックを選ぼう')).toBeInTheDocument();
    expect(screen.getByText('発音練習')).toBeInTheDocument();
    expect(screen.getByText('ロールプレイ')).toBeInTheDocument();

    // Should show topic categories
    expect(screen.getByText('初級者向け')).toBeInTheDocument();
    expect(screen.getByText('中級者向け')).toBeInTheDocument();
    expect(screen.getByText('上級者向け')).toBeInTheDocument();
  });

  it('navigates to pronunciation practice', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Click pronunciation practice button
    const pronunciationButton = screen.getByText('発音練習');
    await user.click(pronunciationButton);

    // Should navigate to pronunciation practice page
    await waitFor(() => {
      expect(screen.getByText('発音練習')).toBeInTheDocument();
    });
  });

  it('creates and navigates to custom topic conversation', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Find and fill custom topic input
    const customTopicInput = screen.getByPlaceholderText(/興味のあるトピック/);
    await user.type(customTopicInput, 'テスト会話トピック');

    // Click generate button
    const generateButton = screen.getByText('会話を生成');
    await user.click(generateButton);

    // Should navigate to conversation view
    await waitFor(() => {
      expect(screen.getByText('会話練習')).toBeInTheDocument();
    });
  });

  it('navigates to favorites and back', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Click favorites link in navigation
    const favoritesLink = screen.getByText('お気に入り');
    await user.click(favoritesLink);

    // Should show favorites page
    await waitFor(() => {
      expect(screen.getByText('お気に入りの会話')).toBeInTheDocument();
    });

    // Navigate back to home
    const homeLink = screen.getByText('ホーム');
    await user.click(homeLink);

    await waitFor(() => {
      expect(screen.getByText('会話トピックを選ぼう')).toBeInTheDocument();
    });
  });

  it('opens and closes settings modal', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Click settings button
    const settingsButton = screen.getByLabelText('設定を開く');
    await user.click(settingsButton);

    // Should open settings modal
    await waitFor(() => {
      expect(screen.getByText('設定')).toBeInTheDocument();
    });

    // Close modal by clicking outside or close button
    const closeButton = screen.getByLabelText('閉じる');
    await user.click(closeButton);

    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByText('設定')).not.toBeInTheDocument();
    });
  });

  it('handles conversation topic selection and generation', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Click on a predefined topic
    const topicCard = screen.getByText('レストランでの注文');
    await user.click(topicCard.closest('button')!);

    // Should navigate to conversation and start generating
    await waitFor(() => {
      expect(screen.getByText('会話練習')).toBeInTheDocument();
    });

    // Should show loading state initially
    expect(screen.getByText('会話を生成中...')).toBeInTheDocument();

    // Wait for conversation to be generated
    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('handles error states gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock Gemini service to throw error
    const { generateConversation } = require('../../services/geminiService');
    generateConversation.mockRejectedValueOnce(new Error('API Error'));
    
    render(<App />);

    // Navigate to conversation
    const topicCard = screen.getByText('レストランでの注文');
    await user.click(topicCard.closest('button')!);

    // Should show error state
    await waitFor(() => {
      expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('persists custom topic history in localStorage', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Create custom topic
    const customTopicInput = screen.getByPlaceholderText(/興味のあるトピック/);
    await user.type(customTopicInput, 'テスト履歴トピック');

    const generateButton = screen.getByText('会話を生成');
    await user.click(generateButton);

    // Should save to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'customTopicHistory',
      expect.stringContaining('テスト履歴トピック')
    );
  });

  it('shows offline indicator when offline', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    render(<App />);

    expect(screen.getByText('オフラインモード')).toBeInTheDocument();
  });

  it('handles speech synthesis integration', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Navigate to conversation
    const topicCard = screen.getByText('レストランでの注文');
    await user.click(topicCard.closest('button')!);

    // Wait for conversation to load
    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    });

    // Click play button for speech
    const playButton = screen.getByLabelText('音声を再生');
    await user.click(playButton);

    expect(mockSpeak).toHaveBeenCalledWith('สวัสดีครับ', 'th-TH');
  });

  it('handles speech recognition integration', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Navigate to conversation
    const topicCard = screen.getByText('レストランでの注文');
    await user.click(topicCard.closest('button')!);

    await waitFor(() => {
      expect(screen.getByText('สวัสดีครับ')).toBeInTheDocument();
    });

    // Click microphone button
    const micButton = screen.getByLabelText('音声認識を開始');
    await user.click(micButton);

    expect(mockStartListening).toHaveBeenCalled();
  });

  it('navigates through all main sections without errors', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Test navigation to each main section
    const sections = [
      { text: 'お気に入り', expectedContent: 'お気に入りの会話' },
      { text: 'ロールプレイ', expectedContent: 'ロールプレイ練習' },
      { text: 'ホーム', expectedContent: '会話トピックを選ぼう' }
    ];

    for (const section of sections) {
      const link = screen.getByText(section.text);
      await user.click(link);
      
      await waitFor(() => {
        expect(screen.getByText(section.expectedContent)).toBeInTheDocument();
      });
    }
  });

  it('handles favorites functionality end-to-end', async () => {
    const user = userEvent.setup();
    
    // Mock favorites in localStorage
    const mockFavorites = JSON.stringify([
      {
        id: 'test-favorite',
        thai: 'สวัสดี',
        paiboon: 'sà-wàt-dii',
        english: 'hello',
        explanation: 'greeting',
        addedAt: new Date().toISOString()
      }
    ]);
    
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'favorites') return mockFavorites;
      return null;
    });

    render(<App />);

    // Navigate to favorites
    const favoritesLink = screen.getByText('お気に入り');
    await user.click(favoritesLink);

    // Should show favorite item
    await waitFor(() => {
      expect(screen.getByText('สวัสดี')).toBeInTheDocument();
      expect(screen.getByText('hello')).toBeInTheDocument();
    });
  });

  it('handles legal page navigation', async () => {
    const user = userEvent.setup();
    
    render(<App />);

    // Click legal link in footer
    const legalLink = screen.getAllByText('プライバシーポリシー')[0];
    await user.click(legalLink);

    // Should navigate to legal page
    await waitFor(() => {
      expect(screen.getByText('利用規約とプライバシーポリシー')).toBeInTheDocument();
    });
  });
});