
import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [rate, setRate] = useState(1);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            console.log('🎼 Initializing SpeechSynthesis...');
            setIsSupported(true);
            
            const handleVoicesChanged = () => {
                try {
                    const availableVoices = window.speechSynthesis.getVoices();
                    console.log(`🎤 Found ${availableVoices.length} available voices`);
                    setVoices(availableVoices);
                    
                    // Set default Thai voice
                    const thaiVoice = availableVoices.find(voice => voice.lang.startsWith('th'));
                    if (thaiVoice) {
                        console.log('✅ Thai voice found:', thaiVoice.name);
                        setSelectedVoice(thaiVoice);
                    } else {
                        console.log('⚠️ No Thai voice found, using default');
                        setSelectedVoice(availableVoices[0] || null);
                    }
                } catch (error) {
                    console.error('Error loading voices:', error);
                }
            };
            
            window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
            handleVoicesChanged(); // initial call
            
            return () => {
                try {
                    console.log('🧹 Cleaning up SpeechSynthesis');
                    window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                        window.speechSynthesis.cancel();
                    }
                } catch (error) {
                    console.error('Error during SpeechSynthesis cleanup:', error);
                }
            };
        } else {
            console.warn('⚠️ SpeechSynthesis not supported in this browser');
        }
    }, []);

    const speak = useCallback((text: string, lang: string, onEnd?: () => void) => {
        if (!isSupported) {
            console.warn('SpeechSynthesis not supported');
            onEnd?.();
            return;
        }
        if (!selectedVoice) {
            console.warn('No voice selected');
            onEnd?.();
            return;
        }
        
        // 既存の音声を安全に停止
        try {
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
                // 短い遅延でキャンセル処理を確実に
                setTimeout(() => {
                    proceedWithSpeech();
                }, 100);
            } else {
                proceedWithSpeech();
            }
        } catch (error) {
            console.error('Error canceling previous speech:', error);
            proceedWithSpeech();
        }
        
        function proceedWithSpeech() {
            try {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = selectedVoice;
                utterance.lang = lang;
                utterance.rate = rate;
                utterance.volume = 1.0;
                utterance.pitch = 1.0;

                let hasStarted = false;
                let hasEnded = false;

                utterance.onend = () => {
                    if (!hasEnded) {
                        console.log('🏁 SpeechSynthesis ended normally');
                        hasEnded = true;
                        setIsSpeaking(false);
                        onEnd?.();
                    }
                };

                utterance.onerror = (e) => {
                    console.error("❌ SpeechSynthesis Error:", {
                        error: e.error,
                        type: e.type,
                        charIndex: e.charIndex,
                        utterance: e.utterance
                    });
                    
                    if (!hasEnded) {
                        hasEnded = true;
                        setIsSpeaking(false);
                        
                        // エラーが 'interrupted' の場合は正常終了として扱う
                        if (e.error === 'interrupted') {
                            console.log('🔄 Speech was interrupted, treating as normal completion');
                            onEnd?.();
                        } else {
                            // 他のエラーの場合も終了コールバックを呼ぶ
                            console.warn(`Speech synthesis error: ${e.error}`);
                            onEnd?.();
                        }
                    }
                };

                // タイムアウト処理（長時間応答がない場合）
                const timeoutId = setTimeout(() => {
                    if (!hasStarted && !hasEnded) {
                        console.warn('⏰ SpeechSynthesis timeout - no start event');
                        hasEnded = true;
                        setIsSpeaking(false);
                        window.speechSynthesis.cancel();
                        onEnd?.();
                    }
                }, 5000);

                utterance.onstart = () => {
                    clearTimeout(timeoutId);
                    if (!hasEnded) {
                        console.log('✅ SpeechSynthesis started successfully');
                        hasStarted = true;
                        setIsSpeaking(true);
                    }
                };
                
                console.log('🎤 Starting SpeechSynthesis for:', text.substring(0, 20) + '...');
                window.speechSynthesis.speak(utterance);
                
            } catch (speechError) {
                console.error('❌ Failed to create or speak utterance:', speechError);
                setIsSpeaking(false);
                onEnd?.();
            }
        }
    }, [isSupported, selectedVoice, rate]);

    const cancel = useCallback(() => {
        if (isSupported) {
            try {
                console.log('🛑 Cancelling SpeechSynthesis');
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } catch (error) {
                console.error('Error cancelling speech synthesis:', error);
                setIsSpeaking(false);
            }
        }
    }, [isSupported]);

    return { isSupported, isSpeaking, voices, selectedVoice, setSelectedVoice, rate, setRate, speak, cancel };
};
