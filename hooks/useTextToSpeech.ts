
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
                    
                    // PC環境でのデバッグ情報を追加
                    if (availableVoices.length > 0) {
                        console.log('🔍 Available voices:', availableVoices.map(v => ({
                            name: v.name,
                            lang: v.lang,
                            isLocal: v.localService
                        })));
                    }
                    
                    setVoices(availableVoices);
                    
                    // PC環境でのタイ語音声検索を強化
                    let thaiVoice = availableVoices.find(voice => voice.lang.startsWith('th'));
                    
                    // タイ語音声が見つからない場合、代替音声を探す
                    if (!thaiVoice) {
                        // 英語音声を代替として使用（PC環境では一般的）
                        thaiVoice = availableVoices.find(voice => 
                            voice.lang.startsWith('en') && voice.localService
                        ) || availableVoices.find(voice => voice.lang.startsWith('en'));
                        
                        if (thaiVoice) {
                            console.log('🔄 Using English voice as fallback for Thai:', thaiVoice.name);
                        }
                    }
                    
                    if (thaiVoice) {
                        console.log('✅ Voice selected:', {
                            name: thaiVoice.name,
                            lang: thaiVoice.lang,
                            isLocal: thaiVoice.localService
                        });
                        setSelectedVoice(thaiVoice);
                    } else {
                        console.log('⚠️ No suitable voice found, using first available');
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
                
                // PC環境での言語設定を最適化
                if (selectedVoice && selectedVoice.lang.startsWith('en')) {
                    // 英語音声でタイ語を読む場合の設定調整
                    utterance.lang = selectedVoice.lang;
                    utterance.rate = 0.8; // 少し遅めに設定
                    console.log('🔧 Using English voice for Thai text with adjusted settings');
                } else {
                    utterance.lang = lang;
                    utterance.rate = rate;
                }
                
                // PC環境での音量とピッチ設定を最適化
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
