
import React, { createContext, useContext, ReactNode } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useGoogleCloudTTS, TTSHookConfig } from '../hooks/useGoogleCloudTTS';

interface AudioContextType {
    // SpeechSynthesis API用（フォールバック）
    isSupported: boolean;
    isSpeaking: boolean;
    voices: SpeechSynthesisVoice[];
    selectedVoice: SpeechSynthesisVoice | null;
    setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
    rate: number;
    setRate: (rate: number) => void;
    speak: (text: string, lang: string, onEnd?: () => void) => void;
    cancel: () => void;
    testAudio: () => void;
    
    // Google Cloud TTS用（メイン）
    speakThai: (thaiText: string, onEnd?: () => void) => Promise<void>;
    isCloudTTSLoading: boolean;
    isCloudTTSPlaying: boolean;
    cloudTTSError: string | null;
    stopCloudTTS: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Google Cloud TTS設定
const DEFAULT_TTS_CONFIG: TTSHookConfig = {
    voice: 'chirp3hd-a',
    quality: 'premium',
    preferredEngine: 'chirp3hd',
    mobileOptimization: true,
    autoPlay: false,
    preloadCommonPhrases: false,
    enableMetrics: true
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const tts = useTextToSpeech();
    const [cloudTTSState, cloudTTSControls] = useGoogleCloudTTS(DEFAULT_TTS_CONFIG);
    
    // Google Cloud TTSでタイ語を話す関数
    const speakThai = async (thaiText: string, onEnd?: () => void): Promise<void> => {
        try {
            console.log('🔊 Using Google Cloud TTS for:', thaiText.substring(0, 20) + '...');
            
            // まず音声を合成
            const audioResult = await cloudTTSControls.synthesize({ thaiText });
            
            if (audioResult) {
                // 合成された音声を再生
                await cloudTTSControls.play(audioResult);
                onEnd?.();
            } else {
                console.error('❌ Cloud TTS synthesis failed - no audio result');
                throw new Error('Google Cloud TTS synthesis failed');
            }
        } catch (error) {
            console.error('❌ Cloud TTS error:', error);
            throw error; // エラーを再スローして呼び出し元で処理
        }
    };
    
    const value: AudioContextType = {
        // SpeechSynthesis API（フォールバック）
        ...tts,
        
        // Google Cloud TTS（メイン）
        speakThai,
        isCloudTTSLoading: cloudTTSState.isLoading,
        isCloudTTSPlaying: cloudTTSState.isPlaying,
        cloudTTSError: cloudTTSState.error,
        stopCloudTTS: cloudTTSControls.stop
    };
    
    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = (): AudioContextType => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
