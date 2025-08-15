/**
 * Google Cloud TTS Chirp3HDを使用したReactフック
 * タイ語学習アプリケーション用の音声合成管理
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  GoogleCloudTTSService, 
  createGoogleCloudTTSService,
  TTSRequest,
  AudioResult,
  TTSMetrics,
  GoogleCloudTTSConfig
} from '../services/googleCloudTTSService';

export interface TTSHookConfig extends GoogleCloudTTSConfig {
  autoPlay?: boolean;
  preloadCommonPhrases?: boolean;
  maxConcurrentRequests?: number;
  enableMetrics?: boolean;
}

export interface TTSState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  metrics: TTSMetrics | null;
  cacheStats: {
    size: number;
    hitRate: number;
    totalRequests: number;
  } | null;
}

export interface TTSControls {
  synthesize: (request: TTSRequest) => Promise<AudioResult | null>;
  play: (audioResult: AudioResult) => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  clearCache: () => void;
  preloadPhrases: (phrases: string[]) => Promise<void>;
  getMetrics: () => TTSMetrics | null;
}

/**
 * Google Cloud TTS Chirp3HDを使用するためのReactフック
 */
export const useGoogleCloudTTS = (config: TTSHookConfig): [TTSState, TTSControls] => {
  const [state, setState] = useState<TTSState>({
    isLoading: false,
    isPlaying: false,
    error: null,
    metrics: null,
    cacheStats: null
  });

  const serviceRef = useRef<GoogleCloudTTSService | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // サービスの初期化
  useEffect(() => {
    try {
      // フロントエンドでは資格情報を扱わず、サーバAPIに委譲
      serviceRef.current = createGoogleCloudTTSService(config);
      
      // Web Audio APIのコンテキスト初期化（PC環境を優先して対応）
      if (typeof window !== 'undefined') {
        try {
          // PC環境でのAudioContext初期化を改善
          // @ts-ignore - ブラウザ互換性のため
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            console.log('🎼 Initializing AudioContext for PC...');
            audioContextRef.current = new AudioContextClass({
              // PC環境でのレイテンシー最適化
              latencyHint: 'interactive',
              sampleRate: 44100
            });
            
            // PC環境でのAudioContext状態監視
            if (audioContextRef.current) {
              console.log('✅ AudioContext initialized:', {
                state: audioContextRef.current.state,
                sampleRate: audioContextRef.current.sampleRate
              });
              
              // 状態変更の監視
              audioContextRef.current.onstatechange = () => {
                console.log('🔄 AudioContext state changed:', audioContextRef.current?.state);
              };
            }
          }
        } catch (contextError) {
          console.warn('❌ AudioContext初期化に失敗しました（HTML5 Audioを使用）:', contextError);
          // AudioContextが使用できない場合はHTML5 Audioのみを使用
          audioContextRef.current = null;
        }
      }

      // よく使用されるフレーズのプリロード（一時的に無効化）
      if (false && config.preloadCommonPhrases && serviceRef.current) {
        const commonPhrases = [
          'สวัสดี', 'ขอบคุณ', 'ขอโทษ', 'ใช่', 'ไม่ใช่',
          'ดี', 'ไม่ดี', 'เข้าใจ', 'ไม่เข้าใจ'
        ];
        
        serviceRef.current.preloadCommonPhrases(commonPhrases)
          .catch(error => console.warn('プリロードに失敗:', error));
      }

      console.log('✅ Google Cloud TTS サービスが正常に初期化されました');

    } catch (error) {
      console.error('❌ TTS初期化エラー:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'TTS初期化エラー'
      }));
    }

    // クリーンアップ関数
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      if (serviceRef.current) {
        serviceRef.current.close();
      }
    };
  }, [config]);

  // 音声合成メソッド
  const synthesize = useCallback(async (request: TTSRequest): Promise<AudioResult | null> => {
    if (!serviceRef.current) {
      setState(prev => ({ ...prev, error: 'TTSサービスが初期化されていません' }));
      return null;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await serviceRef.current.synthesize(request);
      
      // メトリクス更新
      if (config.enableMetrics) {
        const metrics = serviceRef.current.getMetrics();
        setState(prev => ({
          ...prev,
          metrics,
          isLoading: false
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }

      // 自動再生が有効な場合
      if (config.autoPlay) {
        await play(result);
      }

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'TTS合成エラー';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return null;
    }
  }, [config.autoPlay, config.enableMetrics]);

  // 音声再生メソッド
  const play = useCallback(async (audioResult: AudioResult): Promise<void> => {
    try {
      // PC環境でのユーザーインタラクション確保
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        // ユーザーのクリックなどのインタラクションが必要な場合の処理
        console.log('🖱️ AudioContext suspended, user interaction required for PC audio');
        
        // DOM要素にクリックイベントを一時的に追加
        const enableAudio = async () => {
          try {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
              await audioContextRef.current.resume();
              console.log('✅ AudioContext resumed after user interaction');
            }
          } catch (error) {
            console.warn('AudioContext resume failed:', error);
          }
        };

        // document全体でクリックイベントをリスンし、AudioContextを復帰
        const clickHandler = () => {
          enableAudio();
          document.removeEventListener('click', clickHandler);
          document.removeEventListener('keydown', clickHandler);
        };
        
        document.addEventListener('click', clickHandler, { once: true });
        document.addEventListener('keydown', clickHandler, { once: true });
      }
      
      // 前の音声を停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }

      // ArrayBufferをBlobに変換（PC環境最適化）
      const mimeType = 'audio/mpeg'; // PC環境ではMP3が最も互換性が高い
      const blob = new Blob([audioResult.audioContent], { type: mimeType });
      const audioUrl = URL.createObjectURL(blob);

      // 新しいAudioオブジェクト作成
      const audio = new Audio();
      audioRef.current = audio;

      // PC環境での設定最適化
      audio.preload = 'auto';
      audio.volume = 1.0;
      audio.muted = false;
      
      // PC環境でのCORS設定
      audio.crossOrigin = 'anonymous';
      
      // PC環境でのmedia sessionサポート（可能な場合）
      if ('mediaSession' in navigator) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Thai Talk Tutor Audio',
            artist: 'Google Cloud TTS',
            artwork: []
          });
        } catch (mediaSessionError) {
          console.log('MediaSession not available:', mediaSessionError);
        }
      }
      
      // 音源を設定（PC環境では明示的に設定）
      console.log('🔊 Setting audio source for PC:', audioUrl.substring(0, 50) + '...');
      audio.src = audioUrl;

      setState(prev => ({ ...prev, isPlaying: true, error: null }));

      // 音声イベントリスナー設定
      return new Promise((resolve, reject) => {
        let hasStarted = false;

        // PC環境での音声再生処理を改善
        const playHandler = async () => {
          if (hasStarted) return;
          hasStarted = true;

          try {
            // AudioContextの復帰処理（必要な場合のみ）
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
              try {
                console.log('🔊 AudioContext resuming for PC...');
                await audioContextRef.current.resume();
                console.log('✅ AudioContext resumed successfully');
              } catch (contextError) {
                console.warn('AudioContext resume failed:', contextError);
              }
            }
            
            // PCブラウザでのユーザーインタラクション要件対応
            console.log('🎵 Starting audio playback for PC...');
            
            // 音量設定を確認
            audio.volume = 1.0;
            audio.muted = false;
            
            // 音声再生
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
              await playPromise;
              console.log('✅ Audio playback started successfully on PC');
            }
            
            resolve();
          } catch (playError) {
            console.error('❌ Audio play failed on PC:', playError);
            
            // より詳細なエラー処理
            let errorMessage = 'PCでの音声再生に失敗しました。';
            
            if (playError.name === 'NotAllowedError') {
              errorMessage = 'ブラウザが音声再生をブロックしています。ページをクリックしてから再試行してください。';
            } else if (playError.name === 'AbortError') {
              errorMessage = '音声再生が中断されました。再度お試しください。';
            } else if (playError.name === 'NotSupportedError') {
              errorMessage = 'この音声形式はブラウザでサポートされていません。';
            } else {
              errorMessage += ` エラー詳細: ${playError.message}`;
            }
            
            setState(prev => ({
              ...prev,
              isPlaying: false,
              error: errorMessage
            }));
            reject(playError);
          }
        };

        // PC用の改善されたイベント処理
        const loadedHandler = () => {
          console.log('🔄 Audio loaded, attempting to play...');
          playHandler();
        };

        const canPlayHandler = () => {
          console.log('🎶 Audio can play, starting playback...');
          playHandler();
        };

        // 複数のイベントで再生を試行（PC互換性向上）
        audio.addEventListener('loadeddata', loadedHandler, { once: true });
        audio.addEventListener('canplay', canPlayHandler, { once: true });
        audio.addEventListener('canplaythrough', playHandler, { once: true });

        audio.onended = () => {
          console.log('🏁 Audio playback ended');
          setState(prev => ({ ...prev, isPlaying: false }));
          URL.revokeObjectURL(audioUrl);
          // イベントリスナーのクリーンアップ
          audio.removeEventListener('loadeddata', loadedHandler);
          audio.removeEventListener('canplay', canPlayHandler);
          audio.removeEventListener('canplaythrough', playHandler);
          if (!hasStarted) resolve();
        };

        audio.onerror = (error) => {
          console.error('❌ Audio error on PC:', error, audio.error);
          
          let errorMessage = '音声再生エラー: ';
          if (audio.error) {
            switch (audio.error.code) {
              case MediaError.MEDIA_ERR_ABORTED:
                errorMessage += '音声の読み込みが中断されました';
                break;
              case MediaError.MEDIA_ERR_NETWORK:
                errorMessage += 'ネットワークエラーが発生しました';
                break;
              case MediaError.MEDIA_ERR_DECODE:
                errorMessage += '音声ファイルの形式に問題があります';
                break;
              case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage += 'サポートされていない音声形式です';
                break;
              default:
                errorMessage += audio.error.message || '不明なエラー';
            }
          } else {
            errorMessage += '不明なエラー';
          }
          
          setState(prev => ({
            ...prev,
            isPlaying: false,
            error: errorMessage
          }));
          URL.revokeObjectURL(audioUrl);
          // イベントリスナーのクリーンアップ
          audio.removeEventListener('loadeddata', loadedHandler);
          audio.removeEventListener('canplay', canPlayHandler);
          audio.removeEventListener('canplaythrough', playHandler);
          reject(error);
        };

        // PC環境では長めのタイムアウトを設定（10秒）
        setTimeout(() => {
          if (!hasStarted) {
            console.warn('⏰ Audio load timeout on PC');
            setState(prev => ({
              ...prev,
              isPlaying: false,
              error: '音声読み込みがタイムアウトしました。ネットワーク接続を確認してください。'
            }));
            URL.revokeObjectURL(audioUrl);
            // イベントリスナーのクリーンアップ
            audio.removeEventListener('loadeddata', loadedHandler);
            audio.removeEventListener('canplay', canPlayHandler);
            audio.removeEventListener('canplaythrough', playHandler);
            reject(new Error('Audio load timeout'));
          }
        }, 10000);
      });

    } catch (error) {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        error: error instanceof Error ? error.message : '音声再生エラー'
      }));
      throw error;
    }
  }, []);

  // 音声停止メソッド
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // 音声一時停止メソッド
  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // 音声再開メソッド
  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setState(prev => ({ ...prev, isPlaying: true })))
        .catch(error => setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : '音声再開エラー'
        })));
    }
  }, []);

  // キャッシュクリアメソッド
  const clearCache = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.clearCache();
      setState(prev => ({ ...prev, cacheStats: null }));
    }
  }, []);

  // フレーズプリロードメソッド
  const preloadPhrases = useCallback(async (phrases: string[]): Promise<void> => {
    if (!serviceRef.current) {
      throw new Error('TTSサービスが初期化されていません');
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await serviceRef.current.preloadCommonPhrases(phrases);
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'プリロードエラー'
      }));
      throw error;
    }
  }, []);

  // メトリクス取得メソッド
  const getMetrics = useCallback((): TTSMetrics | null => {
    return serviceRef.current?.getMetrics() || null;
  }, []);

  // 状態とコントロール関数を返す
  return [
    state,
    {
      synthesize,
      play,
      stop,
      pause,
      resume,
      clearCache,
      preloadPhrases,
      getMetrics
    }
  ];
};

/**
 * 簡易版TTSフック（基本的な音声合成のみ）
 */
export const useSimpleGoogleTTS = (config: GoogleCloudTTSConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(async (thaiText: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const service = createGoogleCloudTTSService(config);
      const result = await service.synthesize({ thaiText });
      
      // 音声を再生
      const blob = new Blob([result.audioContent], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      
      await audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

    } catch (err) {
      setError(err instanceof Error ? err.message : 'TTS エラー');
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  return { speak, isLoading, error };
};

/**
 * TTS設定管理用フック
 */
export const useTTSSettings = () => {
  const loadSettingsFromStorage = (): TTSHookConfig => {
    try {
      const saved = localStorage.getItem('tts-settings');
      if (saved) {
        return { ...getDefaultSettings(), ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('TTS設定の読み込みに失敗:', error);
    }
    return getDefaultSettings();
  };

  const getDefaultSettings = (): TTSHookConfig => ({
    voice: 'chirp3hd-a', // デフォルトをChirp3HD音声に変更
    quality: 'premium',
    preferredEngine: 'chirp3hd', // デフォルトエンジンをChirp3HDに設定
    mobileOptimization: true, // モバイル最適化を有効化
    autoPlay: true,
    preloadCommonPhrases: false,
    maxConcurrentRequests: 3,
    enableMetrics: true
  });

  const [settings, setSettings] = useState<TTSHookConfig>(loadSettingsFromStorage);

  const updateSettings = useCallback((newSettings: Partial<TTSHookConfig>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem('tts-settings', JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('TTS設定の保存に失敗:', error);
      return false;
    }
  }, [settings]);

  const resetSettings = useCallback(() => {
    const defaultSettings = getDefaultSettings();
    setSettings(defaultSettings);
    try {
      localStorage.setItem('tts-settings', JSON.stringify(defaultSettings));
    } catch (error) {
      console.error('TTS設定のリセットに失敗:', error);
    }
  }, []);

  // 利用可能な音声一覧
  const availableVoices = [
    { value: 'chirp3hd-a', label: 'Chirp3HD A (高品質)', engine: 'chirp3hd' },
    { value: 'chirp3hd-c', label: 'Chirp3HD C (高品質)', engine: 'chirp3hd' },
    { value: 'neural2-a', label: 'Standard A (互換性)', engine: 'standard' },
    { value: 'neural2-c', label: 'Standard C (互換性)', engine: 'standard' }
  ];

  // 利用可能なエンジン一覧
  const availableEngines = [
    { value: 'chirp3hd', label: 'Chirp3HD (高品質・モバイル対応)' },
    { value: 'standard', label: 'Standard (互換性重視)' }
  ];

  return {
    settings,
    updateSettings,
    saveSettings,
    resetSettings,
    availableVoices,
    availableEngines
  };
};