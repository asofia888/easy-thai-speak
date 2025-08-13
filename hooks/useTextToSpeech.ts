
import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [rate, setRate] = useState(1);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true);
            const handleVoicesChanged = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
                // Set default Thai voice
                const thaiVoice = availableVoices.find(voice => voice.lang.startsWith('th'));
                setSelectedVoice(thaiVoice || availableVoices[0] || null);
            };
            window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
            handleVoicesChanged(); // initial call
            return () => {
                window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                window.speechSynthesis.cancel();
            };
        }
    }, []);

    const speak = useCallback((text: string, lang: string, onEnd?: () => void) => {
        if (!isSupported) {
            alert('ご使用のブラウザは音声読み上げに対応していません。');
            onEnd?.();
            return;
        }
        if (!selectedVoice) {
            onEnd?.();
            return;
        }
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.lang = lang;
        utterance.rate = rate;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            onEnd?.();
        };
        utterance.onerror = (e) => {
            console.error("SpeechSynthesis Error:", e);
            setIsSpeaking(false);
            onEnd?.();
        };
        
        window.speechSynthesis.speak(utterance);
    }, [isSupported, selectedVoice, rate]);

    const cancel = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [isSupported]);

    return { isSupported, isSpeaking, voices, selectedVoice, setSelectedVoice, rate, setRate, speak, cancel };
};
