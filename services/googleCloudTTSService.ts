/**
 * Google Cloud Text-to-Speech Chirp3HD統合サービス（フロントエンド）
 * フロント側では直接SDKを使用せず、バックエンドAPIを呼び出します
 * 高品質なタイ語音声生成とキャッシュ管理
 */

import { prepareTTSText, escapeForSSML, isValidThaiText } from '../utils/thaiTextProcessor';

// Google Cloud TTS設定インターfaces
export interface GoogleCloudTTSConfig {
  voice: 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c';
  quality: 'standard' | 'premium';
  region?: string;
  preferredEngine?: 'standard' | 'chirp3hd';
  mobileOptimization?: boolean;
}

export interface TTSRequest {
  thaiText: string;
  paiboonDisplay?: string;
  japaneseDisplay?: string;
  options?: SynthesisOptions;
}

export interface SynthesisOptions {
  speed?: number;           // 0.25 - 4.0 (デフォルト: 0.9)
  pitch?: number;          // -20.0 - 20.0 (デフォルト: 0.0)
  emphasis?: 'tone' | 'clarity' | 'normal';
  useSSML?: boolean;
  effectsProfile?: 'headphone' | 'phone' | 'speaker';
  learningLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface AudioResult {
  audioContent: ArrayBuffer;
  duration: number;
  quality: 'high' | 'medium' | 'low';
  cacheHit: boolean;
  processingTime: number;
  metadata: {
    originalText: string;
    processedText: string;
    voice: string;
    options: SynthesisOptions;
  };
}

export interface TTSMetrics {
  requestCount: number;
  characterCount: number;
  cacheHitRate: number;
  averageLatency: number;
  errorRate: number;
  costEstimate: number;
}

/**
 * 音声キャッシュ管理クラス
 */
class AudioCache {
  private storage: Map<string, {
    audio: ArrayBuffer;
    timestamp: number;
    frequency: number;
    metadata: any;
  }> = new Map();

  private readonly MAX_CACHE_SIZE = 1000;
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7日間

  generateKey(text: string, options: SynthesisOptions, voice: string): string {
    const optionsHash = JSON.stringify({
      speed: options.speed || 0.9,
      pitch: options.pitch || 0.0,
      emphasis: options.emphasis || 'normal',
      useSSML: options.useSSML || false,
      effectsProfile: options.effectsProfile || 'headphone'
    });
    
    // シンプルなハッシュ生成
    return btoa(encodeURIComponent(`${text}|${voice}|${optionsHash}`))
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 32);
  }

  get(key: string): ArrayBuffer | null {
    const entry = this.storage.get(key);
    if (!entry) return null;

    // キャッシュ期限チェック
    if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
      this.storage.delete(key);
      return null;
    }

    // 使用頻度更新
    entry.frequency++;
    entry.timestamp = Date.now();
    
    return entry.audio;
  }

  set(key: string, audio: ArrayBuffer, metadata: any): void {
    // キャッシュサイズ制限
    if (this.storage.size >= this.MAX_CACHE_SIZE) {
      this.evictLeastUsed();
    }

    this.storage.set(key, {
      audio,
      timestamp: Date.now(),
      frequency: 1,
      metadata
    });
  }

  private evictLeastUsed(): void {
    let leastUsedKey = '';
    let lowestFrequency = Infinity;
    let oldestTime = Infinity;

    for (const [key, entry] of this.storage.entries()) {
      if (entry.frequency < lowestFrequency || 
          (entry.frequency === lowestFrequency && entry.timestamp < oldestTime)) {
        leastUsedKey = key;
        lowestFrequency = entry.frequency;
        oldestTime = entry.timestamp;
      }
    }

    if (leastUsedKey) {
      this.storage.delete(leastUsedKey);
    }
  }

  getStats(): { size: number; hitRate: number; totalRequests: number } {
    const size = this.storage.size;
    const totalRequests = Array.from(this.storage.values())
      .reduce((sum, entry) => sum + entry.frequency, 0);
    
    // 簡易的なヒット率計算
    const hitRate = totalRequests > 0 ? 
      (totalRequests - size) / totalRequests : 0;

    return { size, hitRate, totalRequests };
  }

  clear(): void {
    this.storage.clear();
  }
}

/**
 * Google Cloud TTS Chirp3HDサービスクラス
 */
export class GoogleCloudTTSService {
  private cache: AudioCache;
  private metrics: TTSMetrics;
  private config: GoogleCloudTTSConfig;

  constructor(config: GoogleCloudTTSConfig) {
    this.config = config;
    this.cache = new AudioCache();
    this.metrics = {
      requestCount: 0,
      characterCount: 0,
      cacheHitRate: 0,
      averageLatency: 0,
      errorRate: 0,
      costEstimate: 0
    };
  }

  /**
   * メインの音声合成メソッド
   */
  async synthesizeSpeech(request: TTSRequest): Promise<AudioResult> {
    const startTime = Date.now();
    this.metrics.requestCount++;

    try {
      // 1. タイ文字テキストの前処理
      const processedText = prepareTTSText(request.thaiText, {
        removeExtraSpaces: true,
        normalizePunctuation: true,
        validateQuality: false // 品質チェックを無効化（短い単語でも通す）
      });

      if (!processedText) {
        throw new Error('有効なタイ文字が含まれていません');
      }

      this.metrics.characterCount += processedText.length;

      // 2. キャッシュチェック
      const cacheKey = this.cache.generateKey(
        processedText, 
        request.options || {}, 
        this.config.voice
      );

      const cachedAudio = this.cache.get(cacheKey);
      if (cachedAudio) {
        const processingTime = Date.now() - startTime;
        return {
          audioContent: cachedAudio,
          duration: this.estimateAudioDuration(cachedAudio),
          quality: 'high',
          cacheHit: true,
          processingTime,
          metadata: {
            originalText: request.thaiText,
            processedText,
            voice: this.getVoiceName(),
            options: request.options || {}
          }
        };
      }

      // 3. Google Cloud TTS実行
      const audioContent = await this.callGoogleCloudTTS(
        processedText, 
        request.options || {}
      );

      // 4. 品質評価
      const quality = this.evaluateAudioQuality(audioContent);

      // 5. キャッシュ保存
      this.cache.set(cacheKey, audioContent, {
        text: processedText,
        voice: this.config.voice,
        options: request.options
      });

      const processingTime = Date.now() - startTime;
      this.updateMetrics(processingTime, false);

      return {
        audioContent,
        duration: this.estimateAudioDuration(audioContent),
        quality,
        cacheHit: false,
        processingTime,
        metadata: {
          originalText: request.thaiText,
          processedText,
          voice: this.getVoiceName(),
          options: request.options || {}
        }
      };

    } catch (error) {
      this.metrics.errorRate++;
      console.error('TTS synthesis failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Unknown TTS error'
      );
    }
  }

  /**
   * 互換API: 既存呼び出し用のエイリアス
   */
  async synthesize(request: TTSRequest): Promise<AudioResult> {
    return this.synthesizeSpeech(request);
  }

  /**
   * Google Cloud TTS API呼び出し
   */
  private async callGoogleCloudTTS(
    text: string,
    options: SynthesisOptions
  ): Promise<ArrayBuffer> {
    const payload = {
      text,
      options,
      voice: this.getVoiceName(),
      quality: this.config.quality
    };

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const message = await res.text().catch(() => 'TTS server error');
        throw new Error(message || `TTS server responded with ${res.status}`);
      }

      // サーバは { audioContentBase64: string } を返す想定
      const data = await res.json();
      if (!data || !data.audioContentBase64) {
        throw new Error('Invalid TTS server response');
      }

      return base64ToArrayBuffer(data.audioContentBase64);
    } catch (error) {
      console.error('Google Cloud TTS fetch error:', error);
      throw new Error(`TTS API call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * TTS リクエスト構築
   */
  private buildTTSRequest(text: string, options: SynthesisOptions): any {
    const learningSettings = this.getLearningSettings(options.learningLevel);
    
    const speed = options.speed || learningSettings.speed || 0.9;
    const pitch = options.pitch || learningSettings.pitch || 0.0;
    const useSSML = options.useSSML || learningSettings.useSSML || false;

    // 入力テキストの準備
    const input = useSSML ? 
      { ssml: this.createSSML(text, options) } : 
      { text };

    // 音声設定
    const voice = {
      languageCode: 'th-TH',
      name: this.getVoiceName(),
      ssmlGender: 'NEUTRAL'
    };

    // オーディオ設定
    const audioConfig = {
      audioEncoding: 'MP3',
      sampleRateHertz: 24000, // Chirp3HD高品質設定
      effectsProfileId: [this.getEffectsProfile(options.effectsProfile)],
      pitch,
      speakingRate: speed
    };

    return { input, voice, audioConfig };
  }

  /**
   * SSML生成
   */
  private createSSML(text: string, options: SynthesisOptions): string {
    const escapedText = escapeForSSML(text);
    
    switch (options.emphasis) {
      case 'tone':
        return `<speak><prosody rate="0.8" pitch="+2st">${escapedText}</prosody></speak>`;
      case 'clarity':
        return `<speak><prosody rate="0.7">${escapedText}</prosody></speak>`;
      default:
        return `<speak>${escapedText}</speak>`;
    }
  }

  /**
   * 学習レベル別設定
   */
  private getLearningSettings(level?: string) {
    const settings = {
      beginner: { speed: 0.7, pitch: 0.0, useSSML: true },
      intermediate: { speed: 0.85, pitch: 0.0, useSSML: false },
      advanced: { speed: 1.0, pitch: 0.0, useSSML: false }
    };

    return settings[level as keyof typeof settings] || settings.intermediate;
  }

  /**
   * 音声名取得
   */
  private getVoiceName(): string {
    const config = this.config;
    const preferredEngine = config.preferredEngine || 'standard';
    
    // エンジン別の音声マッピング
    if (preferredEngine === 'chirp3hd') {
      // Chirp3HD音声（高品質、モバイル対応）
      const chirp3hdMap = {
        'chirp3hd-a': 'th-TH-Chirp3-HD-Achernar',
        'chirp3hd-c': 'th-TH-Chirp3-HD-Bellatrix',
        'neural2-a': 'th-TH-Chirp3-HD-Achernar', // フォールバック
        'neural2-c': 'th-TH-Chirp3-HD-Bellatrix' // フォールバック
      } as const;
      return chirp3hdMap[config.voice] || 'th-TH-Chirp3-HD-Achernar';
    } else {
      // Standard音声（互換性重視）
      const standardMap = {
        'neural2-a': 'th-TH-Standard-A',
        'neural2-c': 'th-TH-Standard-B',
        'chirp3hd-a': 'th-TH-Standard-A', // フォールバック
        'chirp3hd-c': 'th-TH-Standard-B'  // フォールバック
      } as const;
      return standardMap[config.voice] || 'th-TH-Standard-A';
    }
  }

  /**
   * エフェクトプロファイル取得
   */
  private getEffectsProfile(profile?: string): string {
    const profiles = {
      headphone: 'headphone-class-device',
      phone: 'telephony-class-application',
      speaker: 'wearable-class-device'
    };

    return profiles[profile as keyof typeof profiles] || profiles.headphone;
  }

  /**
   * 音声品質評価
   */
  private evaluateAudioQuality(audioBuffer: ArrayBuffer): 'high' | 'medium' | 'low' {
    const minHighQualitySize = 50000; // 50KB
    const minMediumQualitySize = 20000; // 20KB

    if (audioBuffer.byteLength >= minHighQualitySize) {
      return 'high';
    } else if (audioBuffer.byteLength >= minMediumQualitySize) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * 音声継続時間推定
   */
  private estimateAudioDuration(audioBuffer: ArrayBuffer): number {
    // MP3の平均的なビットレート (128kbps) と品質設定から推定
    const avgBitrate = 128000; // bits per second
    const bytes = audioBuffer.byteLength;
    const bits = bytes * 8;
    
    return Math.max(0.5, bits / avgBitrate); // 最小0.5秒
  }

  /**
   * メトリクス更新
   */
  private updateMetrics(processingTime: number, cacheHit: boolean): void {
    if (!cacheHit) {
      this.metrics.averageLatency = 
        (this.metrics.averageLatency + processingTime) / 2;
    }

    const cacheStats = this.cache.getStats();
    this.metrics.cacheHitRate = cacheStats.hitRate;

    // コスト推定 (Google Cloud TTSの価格: $16 per 1M characters)
    this.metrics.costEstimate = (this.metrics.characterCount / 1000000) * 16;
  }

  /**
   * 複数テキストの一括処理
   */
  async synthesizeMultiple(
    requests: TTSRequest[]
  ): Promise<Map<string, AudioResult>> {
    const results = new Map<string, AudioResult>();
    const semaphore = new Semaphore(5); // 同時リクエスト数制限

    await Promise.all(
      requests.map(async (request) => {
        await semaphore.acquire();
        try {
          const result = await this.synthesizeSpeech(request);
          results.set(request.thaiText, result);
        } catch (error) {
          console.error(`Failed to synthesize: ${request.thaiText}`, error);
        } finally {
          semaphore.release();
        }
      })
    );

    return results;
  }

  /**
   * よく使用されるフレーズのプリロード
   */
  async preloadCommonPhrases(phrases: string[]): Promise<void> {
    const batchSize = 10;
    
    for (let i = 0; i < phrases.length; i += batchSize) {
      const batch = phrases.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(phrase => 
          this.synthesizeSpeech({ 
            thaiText: phrase,
            options: {
              // プリロード時は品質チェックを緩和
              learningLevel: 'intermediate'
            }
          })
            .catch(error => console.warn(`Preload failed for: ${phrase}`, error))
        )
      );

      // レート制限回避
      if (i + batchSize < phrases.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  }

  /**
   * メトリクス取得
   */
  getMetrics(): TTSMetrics {
    return { ...this.metrics };
  }

  /**
   * キャッシュクリア
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * サービス終了処理
   */
  async close(): Promise<void> {
    // フロントエンド版では特にリソースを閉じる処理なし
  }
}

/**
 * セマフォクラス（同時実行数制限）
 */
class Semaphore {
  private permits: number;
  private waiting: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    this.permits++;
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!;
      this.permits--;
      resolve();
    }
  }
}

// ユーティリティ: base64 -> ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * サービスファクトリー関数
 */
export const createGoogleCloudTTSService = (
  config: GoogleCloudTTSConfig
): GoogleCloudTTSService => {
  return new GoogleCloudTTSService(config);
};