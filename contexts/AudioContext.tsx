
import React, { createContext, useContext, ReactNode } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface AudioContextType {
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
    speakThai: (thaiText: string, onEnd?: () => void) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const tts = useTextToSpeech();
    
    // SpeechSynthesis APIでタイ語を話す関数
    const speakThai = (thaiText: string, onEnd?: () => void): void => {
        console.log('🔊 Using SpeechSynthesis API for Thai:', thaiText.substring(0, 20) + '...');
        tts.speak(thaiText, 'th-TH', onEnd);
    };
    
    const value: AudioContextType = {
        ...tts,
        speakThai
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
