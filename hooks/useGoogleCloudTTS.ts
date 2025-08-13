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
      
      // Web Audio APIのコンテキスト初期化
      if (typeof window !== 'undefined' && window.AudioContext) {
        audioContextRef.current = new AudioContext();
      }

      // よく使用されるフレーズのプリロード
      if (config.preloadCommonPhrases && serviceRef.current) {
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

      // ArrayBufferをBlobに変換
      const blob = new Blob([audioResult.audioContent], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(blob);

      // 新しいAudioオブジェクト作成
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      setState(prev => ({ ...prev, isPlaying: true, error: null }));

      // 音声イベントリスナー設定
      return new Promise((resolve, reject) => {
        audio.onloadeddata = () => {
          audio.play()
            .then(resolve)
            .catch(reject);
        };

        audio.onended = () => {
          setState(prev => ({ ...prev, isPlaying: false }));
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        audio.onerror = (error) => {
          setState(prev => ({
            ...prev,
            isPlaying: false,
            error: '音声再生エラー'
          }));
          URL.revokeObjectURL(audioUrl);
          reject(error);
        };
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
  const [settings, setSettings] = useState<TTSHookConfig>({
    voice: 'neural2-a',
    quality: 'premium',
    autoPlay: true,
    preloadCommonPhrases: true,
    maxConcurrentRequests: 3,
    enableMetrics: true
  });

  const updateSettings = useCallback((newSettings: Partial<TTSHookConfig>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({
      voice: 'neural2-a',
      quality: 'premium',
      autoPlay: true,
      preloadCommonPhrases: true,
      maxConcurrentRequests: 3,
      enableMetrics: true
    });
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings
  };
};