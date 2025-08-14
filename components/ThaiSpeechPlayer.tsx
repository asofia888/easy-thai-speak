/**
 * タイ語音声再生コンポーネント
 * Google Cloud TTS Chirp3HDを使用した高品質な音声学習機能
 */

import React, { useState, useCallback } from 'react';
import { useGoogleCloudTTS, TTSHookConfig } from '../hooks/useGoogleCloudTTS';
import { prepareTTSText, analyzeThaiTextQuality } from '../utils/thaiTextProcessor';
import { getEnvConfig, validateConfig, logConfigStatus, getConfigAdvice } from '../utils/envConfig';

interface ThaiSpeechPlayerProps {
  thaiText: string;
  paiboonText?: string;
  japaneseText?: string;
  learningLevel?: 'beginner' | 'intermediate' | 'advanced';
  showMetrics?: boolean;
  className?: string;
  voiceOverride?: 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c';
  qualityOverride?: 'standard' | 'premium';
  showDebugInfo?: boolean;
}

// 環境設定を取得
const ENV_CONFIG = getEnvConfig();
const CONFIG_VALIDATION = validateConfig(ENV_CONFIG);

const DEFAULT_TTS_CONFIG: TTSHookConfig = {
  voice: ENV_CONFIG.googleCloud.defaultVoice,
  quality: ENV_CONFIG.googleCloud.defaultQuality,
  preferredEngine: ENV_CONFIG.googleCloud.preferredEngine,
  mobileOptimization: ENV_CONFIG.tts.mobileOptimization,
  autoPlay: false,
  preloadCommonPhrases: true,
  enableMetrics: ENV_CONFIG.tts.enableMetrics,
};

export const ThaiSpeechPlayer: React.FC<ThaiSpeechPlayerProps> = ({
  thaiText,
  paiboonText,
  japaneseText,
  learningLevel = 'intermediate',
  showMetrics = false,
  className = '',
  voiceOverride,
  qualityOverride,
  showDebugInfo = false
}) => {
  const [ttsConfig] = useState<TTSHookConfig>(() => ({
    ...DEFAULT_TTS_CONFIG,
    voice: voiceOverride || DEFAULT_TTS_CONFIG.voice,
    quality: qualityOverride || DEFAULT_TTS_CONFIG.quality
  }));
  const [ttsState, ttsControls] = useGoogleCloudTTS(ttsConfig);
  const [textQuality, setTextQuality] = useState<ReturnType<typeof analyzeThaiTextQuality> | null>(null);

  // 設定状況をログ出力（開発時のみ）
  React.useEffect(() => {
    if (ENV_CONFIG.tts.debugMode) {
      logConfigStatus(ENV_CONFIG);
    }
  }, []);

  // テキスト品質分析
  React.useEffect(() => {
    if (thaiText) {
      try {
        const quality = analyzeThaiTextQuality(thaiText);
        setTextQuality(quality);
      } catch (error) {
        console.warn('テキスト品質分析に失敗:', error);
      }
    }
  }, [thaiText]);

  // 音声合成と再生
  const handlePlay = useCallback(async () => {
    if (!thaiText) return;

    try {
      // タイ文字のみを抽出してTTSに送信
      const processedText = prepareTTSText(thaiText);
      
      const audioResult = await ttsControls.synthesize({
        thaiText: processedText,
        paiboonDisplay: paiboonText,
        japaneseDisplay: japaneseText,
        options: {
          learningLevel,
          speed: learningLevel === 'beginner' ? 0.7 : learningLevel === 'advanced' ? 1.0 : 0.85,
          emphasis: learningLevel === 'beginner' ? 'clarity' : 'normal',
          useSSML: learningLevel === 'beginner',
          effectsProfile: 'headphone'
        }
      });

      if (audioResult && !ttsConfig.autoPlay) {
        await ttsControls.play(audioResult);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '音声再生に失敗しました';
      console.error('TTS Error:', errorMessage);
    }
  }, [thaiText, paiboonText, japaneseText, learningLevel, ttsControls, ttsConfig.autoPlay]);

  // エラー処理
  React.useEffect(() => {
    if (ttsState.error) {
      console.error('TTS State Error:', ttsState.error);
    }
  }, [ttsState.error]);

  // レベル別の表示スタイル
  const getLevelStyle = () => {
    switch (learningLevel) {
      case 'beginner':
        return 'bg-green-50 border-green-200';
      case 'advanced':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-orange-50 border-orange-200';
    }
  };

  // 品質インジケーター
  const QualityIndicator = () => {
    if (!textQuality) return null;

    const qualityColor = textQuality.quality === 'high' ? 'text-green-600' : 
                        textQuality.quality === 'medium' ? 'text-orange-600' : 'text-red-600';

    return (
      <div className={`text-xs ${qualityColor} flex items-center space-x-1`}>
        <span>品質: {textQuality.quality}</span>
        {textQuality.hasToneMarks && <span>🎵</span>}
        {textQuality.hasVowels && textQuality.hasConsonants && <span>✓</span>}
      </div>
    );
  };

  // メトリクス表示
  const MetricsDisplay = () => {
    if (!showMetrics || !ttsState.metrics) return null;

    return (
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>リクエスト数: {ttsState.metrics.requestCount}</div>
          <div>キャッシュ率: {(ttsState.metrics.cacheHitRate * 100).toFixed(1)}%</div>
          <div>平均レイテンシ: {ttsState.metrics.averageLatency}ms</div>
          <div>推定コスト: ${ttsState.metrics.costEstimate.toFixed(4)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-4 rounded-lg border ${getLevelStyle()} ${className}`}>
      {/* タイ文字表示 */}
      <div className="mb-3">
        <div className="text-lg font-medium text-gray-900 mb-1">
          {thaiText}
        </div>
        
        {/* 読み方表示（Paiboon+） */}
        {paiboonText && (
          <div className="text-sm text-blue-600 font-mono mb-1">
            {paiboonText}
          </div>
        )}
        
        {/* 日本語訳表示 */}
        {japaneseText && (
          <div className="text-sm text-gray-600">
            {japaneseText}
          </div>
        )}

        {/* 品質インジケーター */}
        <QualityIndicator />

        {/* デバッグ情報表示 */}
        {showDebugInfo && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
            <div className="font-medium mb-1">🔧 TTS設定情報</div>
            <div className="grid grid-cols-2 gap-1 text-gray-600">
              <div>エンジン: {ttsConfig.preferredEngine === 'chirp3hd' ? 'Chirp3HD' : 'Standard'}</div>
              <div>音声: {ttsConfig.voice}</div>
              <div>品質: {ttsConfig.quality}</div>
              <div>モバイル最適化: {ttsConfig.mobileOptimization ? 'ON' : 'OFF'}</div>
            </div>
          </div>
        )}
      </div>

      {/* 再生コントロール */}
      {/* showControls && ( */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlay}
            disabled={ttsState.isLoading || !textQuality?.isValid}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              ttsState.isLoading || !textQuality?.isValid
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {ttsState.isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>合成中...</span>
              </div>
            ) : ttsState.isPlaying ? (
              <div className="flex items-center space-x-2">
                <span>🔊</span>
                <span>再生中</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>🎵</span>
                <span>再生</span>
              </div>
            )}
          </button>

          {ttsState.isPlaying && (
            <>
              <button
                onClick={ttsControls.pause}
                className="px-3 py-2 rounded-md text-sm bg-yellow-600 text-white hover:bg-yellow-700"
              >
                ⏸️ 一時停止
              </button>
              
              <button
                onClick={ttsControls.stop}
                className="px-3 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
              >
                ⏹️ 停止
              </button>
            </>
          )}

          <span className="text-xs text-gray-500">
            レベル: {learningLevel}
          </span>
        </div>
      {/* ) */}

      {/* エラー表示 */}
      {(ttsState.error || !CONFIG_VALIDATION.isValid) && (
        <div className="mt-2 p-3 bg-red-50 border border-red-300 rounded">
          {ttsState.error && (
            <div className="text-sm text-red-700 mb-2">
              ⚠️ {ttsState.error}
            </div>
          )}
          
          {!CONFIG_VALIDATION.isValid && (
            <div className="text-xs text-red-600">
              <div className="font-semibold mb-1">設定エラー:</div>
              {CONFIG_VALIDATION.errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
              
              <details className="mt-2">
                <summary className="cursor-pointer hover:text-red-800">設定手順を見る</summary>
                <div className="mt-2 pl-2 border-l-2 border-red-300">
                  {getConfigAdvice().map((line, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      {line}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
      )}

      {/* メトリクス表示 */}
      <MetricsDisplay />
    </div>
  );
};

/**
 * 複数のタイ語フレーズを連続再生するコンポーネント
 */
interface ThaiPhraseListProps {
  phrases: Array<{
    thai: string;
    paiboon?: string;
    japanese?: string;
    id?: string;
  }>;
  learningLevel?: 'beginner' | 'intermediate' | 'advanced';
  autoPlayNext?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const ThaiPhraseList: React.FC<ThaiPhraseListProps> = ({
  phrases,
  learningLevel = 'intermediate',
  autoPlayNext = false,
  onComplete,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayEnd = useCallback(() => {
    setIsPlaying(false);
    
    if (autoPlayNext && currentIndex < phrases.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsPlaying(true);
      }, 1000); // 1秒間隔
    } else if (currentIndex === phrases.length - 1) {
      onComplete?.();
    }
  }, [autoPlayNext, currentIndex, phrases.length, onComplete]);

  const handlePhraseSelect = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          フレーズ練習 ({currentIndex + 1} / {phrases.length})
        </h3>
        
        <div className="text-sm text-gray-600">
          レベル: {learningLevel}
        </div>
      </div>

      {phrases.map((phrase, index) => (
        <div
          key={phrase.id || index}
          className={`transition-all duration-200 ${
            index === currentIndex 
              ? 'ring-2 ring-blue-500 shadow-md' 
              : index < currentIndex 
                ? 'opacity-60' 
                : 'opacity-80'
          }`}
        >
          <ThaiSpeechPlayer
            thaiText={phrase.thai}
            paiboonText={phrase.paiboon}
            japaneseText={phrase.japanese}
            learningLevel={learningLevel}
            showMetrics={index === currentIndex}
            className={index === currentIndex ? 'border-blue-300' : ''}
          />
          
          {index !== currentIndex && (
            <button
              onClick={() => handlePhraseSelect(index)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              このフレーズに移動
            </button>
          )}
        </div>
      ))}

      {/* 進行状況バー */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / phrases.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>開始</span>
          <span>{Math.round(((currentIndex + 1) / phrases.length) * 100)}% 完了</span>
          <span>完了</span>
        </div>
      </div>
    </div>
  );
};