
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
                    
                    // タイ語音声を検索
                    const thaiVoice = availableVoices.find(voice => voice.lang.startsWith('th'));
                    
                    if (thaiVoice) {
                        console.log('✅ Thai voice found:', thaiVoice.name);
                        setSelectedVoice(thaiVoice);
                    } else {
                        console.log('⚠️ No Thai voice available in browser');
                        setSelectedVoice(null);
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
        
        // 既存の音声を停止
        try {
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
                setTimeout(() => proceedWithSpeech(), 100);
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
                        
                        // PC環境での音声状態をログ出力
                        console.log('🔊 PC Audio Status:', {
                            volume: utterance.volume,
                            rate: utterance.rate,
                            pitch: utterance.pitch,
                            voice: utterance.voice?.name,
                            lang: utterance.lang
                        });
                        
                        hasStarted = true;
                        setIsSpeaking(true);
                    }
                };
                
                console.log('🎤 Starting SpeechSynthesis for:', text.substring(0, 20) + '...');
                
                // PC環境での音声再生前チェック
                if (selectedVoice) {
                    console.log('🔍 Voice details:', {
                        name: selectedVoice.name,
                        lang: selectedVoice.lang,
                        localService: selectedVoice.localService,
                        voiceURI: selectedVoice.voiceURI,
                        default: selectedVoice.default
                    });
                }
                
                // PC環境でのSpeechSynthesis状態確認
                console.log('🎛️ SpeechSynthesis status:', {
                    speaking: window.speechSynthesis.speaking,
                    pending: window.speechSynthesis.pending,
                    paused: window.speechSynthesis.paused
                });
                
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

    // PC環境での音声テスト機能
    const testAudio = useCallback(() => {
        if (!isSupported) {
            console.warn('⚠️ SpeechSynthesis not supported for testing');
            return;
        }

        console.log('🧪 Testing PC audio output...');
        
        // 簡単な英語テストフレーズ
        const testText = 'Audio test. Can you hear this?';
        const testUtterance = new SpeechSynthesisUtterance(testText);
        
        if (selectedVoice) {
            testUtterance.voice = selectedVoice;
        }
        
        testUtterance.volume = 1.0;
        testUtterance.rate = 1.0;
        testUtterance.pitch = 1.0;
        
        testUtterance.onstart = () => {
            console.log('✅ Audio test started successfully');
        };
        
        testUtterance.onend = () => {
            console.log('🏁 Audio test completed');
        };
        
        testUtterance.onerror = (e) => {
            console.error('❌ Audio test failed:', e.error);
        };
        
        window.speechSynthesis.speak(testUtterance);
    }, [isSupported, selectedVoice]);

    return { isSupported, isSpeaking, voices, selectedVoice, setSelectedVoice, rate, setRate, speak, cancel, testAudio };
};
