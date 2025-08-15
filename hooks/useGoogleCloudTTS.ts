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
      
      // Web Audio APIのコンテキスト初期化（PCとモバイル両方に対応）
      if (typeof window !== 'undefined') {
        try {
          // @ts-ignore - ブラウザ互換性のため
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
          }
        } catch (contextError) {
          console.warn('AudioContext初期化に失敗しました（HTML5 Audioを使用）:', contextError);
          // AudioContextが使用できない場合はHTML5 Audioのみを使用
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
      // 前の音声を停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }

      // ArrayBufferをBlobに変換（PC/モバイル対応）
      const mimeType = 'audio/mpeg';
      const blob = new Blob([audioResult.audioContent], { type: mimeType });
      const audioUrl = URL.createObjectURL(blob);

      // 新しいAudioオブジェクト作成
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // 共通設定（PC/モバイル対応）
      audio.preload = 'auto';
      audio.volume = 1.0;

      setState(prev => ({ ...prev, isPlaying: true, error: null }));

      // 音声イベントリスナー設定
      return new Promise((resolve, reject) => {
        let hasStarted = false;

        // PC環境ではcanplaythroughイベントを使用
        const playHandler = async () => {
          if (hasStarted) return;
          hasStarted = true;

          try {
            // AudioContextの復帰処理（必要な場合のみ）
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
              try {
                await audioContextRef.current.resume();
              } catch (contextError) {
                console.warn('AudioContext resume failed:', contextError);
                // AudioContext の復帰に失敗してもHTML5 Audioで再生を試行
              }
            }
            
            // 音声再生
            await audio.play();
            resolve();
          } catch (playError) {
            console.error('Audio play failed:', playError);
            setState(prev => ({
              ...prev,
              isPlaying: false,
              error: 'PCでの音声再生に失敗しました。ブラウザの音声設定を確認してください。'
            }));
            reject(playError);
          }
        };

        // 複数のイベントで再生を試行（PC/モバイル互換性向上）
        audio.addEventListener('canplaythrough', playHandler);
        audio.addEventListener('loadeddata', playHandler);

        audio.onended = () => {
          setState(prev => ({ ...prev, isPlaying: false }));
          URL.revokeObjectURL(audioUrl);
          audio.removeEventListener('canplaythrough', playHandler);
          audio.removeEventListener('loadeddata', playHandler);
          if (!hasStarted) resolve();
        };

        audio.onerror = (error) => {
          console.error('Audio error:', error);
          setState(prev => ({
            ...prev,
            isPlaying: false,
            error: `音声再生エラー: ${audio.error?.message || '不明なエラー'}`
          }));
          URL.revokeObjectURL(audioUrl);
          audio.removeEventListener('canplaythrough', playHandler);
          audio.removeEventListener('loadeddata', playHandler);
          reject(error);
        };

        // 5秒後にタイムアウト
        setTimeout(() => {
          if (!hasStarted) {
            setState(prev => ({
              ...prev,
              isPlaying: false,
              error: '音声読み込みがタイムアウトしました'
            }));
            URL.revokeObjectURL(audioUrl);
            audio.removeEventListener('canplaythrough', playHandler);
            audio.removeEventListener('loadeddata', playHandler);
            reject(new Error('Audio load timeout'));
          }
        }, 5000);
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