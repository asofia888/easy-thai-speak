/**
 * Google Cloud TTS設定管理コンポーネント
 * 音声品質、速度、学習レベルなどの設定を管理
 */

import React, { useState, useCallback } from 'react';
import { useTTSSettings } from '../hooks/useGoogleCloudTTS';
import type { SynthesisOptions, GoogleCloudTTSConfig } from '../services/googleCloudTTSService';

interface TTSSettingsProps {
  onSettingsChange?: (settings: GoogleCloudTTSConfig) => void;
  showAdvancedOptions?: boolean;
  className?: string;
}

export const TTSSettings: React.FC<TTSSettingsProps> = ({
  onSettingsChange,
  showAdvancedOptions = false,
  className = ''
}) => {
  const { settings, updateSettings, resetSettings, availableVoices, availableEngines } = useTTSSettings();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVoiceChange = useCallback((voice: 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c') => {
    const newSettings = { ...settings, voice };
    updateSettings(newSettings);
    onSettingsChange?.(newSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleEngineChange = useCallback((preferredEngine: 'standard' | 'chirp3hd') => {
    const newSettings = { ...settings, preferredEngine };
    updateSettings(newSettings);
    onSettingsChange?.(newSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleQualityChange = useCallback((quality: 'standard' | 'premium') => {
    const newSettings = { ...settings, quality };
    updateSettings(newSettings);
    onSettingsChange?.(newSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleToggleChange = useCallback((key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
    onSettingsChange?.(newSettings);
  }, [settings, updateSettings, onSettingsChange]);

  const handleReset = useCallback(() => {
    resetSettings();
    onSettingsChange?.(settings);
  }, [resetSettings, onSettingsChange, settings]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🎵 TTS設定
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isExpanded ? '簡単表示' : '詳細設定'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            リセット
          </button>
        </div>
      </div>

      {/* 基本設定 */}
      <div className="space-y-4">
        {/* エンジン選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            音声エンジン
          </label>
          <div className="flex space-x-4">
            {availableEngines.map(engine => (
              <label key={engine.value} className="flex items-center">
                <input
                  type="radio"
                  value={engine.value}
                  checked={settings.preferredEngine === engine.value}
                  onChange={(e) => handleEngineChange(e.target.value as 'standard' | 'chirp3hd')}
                  className="mr-2"
                />
                <span className="text-sm">{engine.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Chirp3HD: 高品質音声、モバイル対応 | Standard: 互換性重視
          </p>
        </div>

        {/* 音声選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            音声タイプ
          </label>
          <div className="grid grid-cols-2 gap-3">
            {availableVoices.map(voice => (
              <label key={voice.value} className="flex items-center p-2 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  value={voice.value}
                  checked={settings.voice === voice.value}
                  onChange={(e) => handleVoiceChange(e.target.value as 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c')}
                  className="mr-2"
                />
                <div>
                  <span className="text-sm font-medium">{voice.label}</span>
                  <span className="text-xs text-gray-500 block">({voice.engine})</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 音質設定 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            音質
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="standard"
                checked={settings.quality === 'standard'}
                onChange={(e) => handleQualityChange(e.target.value as 'standard')}
                className="mr-2"
              />
              <span className="text-sm">標準 (低コスト)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="premium"
                checked={settings.quality === 'premium'}
                onChange={(e) => handleQualityChange(e.target.value as 'premium')}
                className="mr-2"
              />
              <span className="text-sm">プレミアム (高品質)</span>
            </label>
          </div>
        </div>

        {/* 基本オプション */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.autoPlay || false}
              onChange={(e) => handleToggleChange('autoPlay', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">自動再生</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.preloadCommonPhrases || false}
              onChange={(e) => handleToggleChange('preloadCommonPhrases', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">よく使用するフレーズを事前読み込み</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.mobileOptimization || false}
              onChange={(e) => handleToggleChange('mobileOptimization', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">モバイル最適化（音声再生の安定性向上）</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.enableMetrics || false}
              onChange={(e) => handleToggleChange('enableMetrics', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">使用統計を表示</span>
          </label>
        </div>
      </div>

      {/* 詳細設定 */}
      {(isExpanded || showAdvancedOptions) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">詳細設定</h4>
          
          <div className="space-y-4">
            {/* 同時リクエスト数 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最大同時リクエスト数: {settings.maxConcurrentRequests || 3}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.maxConcurrentRequests || 3}
                onChange={(e) => updateSettings({ maxConcurrentRequests: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* 地域設定 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                リージョン
              </label>
              <select
                value={settings.region || 'us-central1'}
                onChange={(e) => updateSettings({ region: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="us-central1">米国中部 (us-central1)</option>
                <option value="asia-northeast1">東京 (asia-northeast1)</option>
                <option value="europe-west1">ベルギー (europe-west1)</option>
                <option value="asia-southeast1">シンガポール (asia-southeast1)</option>
              </select>
            </div>

            {/* API認証情報設定（サーバ側管理） */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                🔐 Google Cloud認証情報
              </h5>
              <div className="text-xs text-gray-600">
                認証情報はフロントでは扱わず、サーバ側で `GOOGLE_APPLICATION_CREDENTIALS` を設定して管理します。
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 設定サマリー */}
      <div className="mt-6 p-3 bg-blue-50 rounded-md">
        <div className="text-sm text-blue-800">
          <div className="font-medium mb-1">現在の設定</div>
          <div className="space-y-1 text-xs">
            <div>エンジン: {settings.preferredEngine === 'chirp3hd' ? 'Chirp3HD (高品質)' : 'Standard (互換性)'}</div>
            <div>音声: {settings.voice} ({settings.quality}品質)</div>
            <div>
              オプション: 
              {settings.autoPlay && ' 自動再生'}
              {settings.preloadCommonPhrases && ' プリロード'}
              {settings.mobileOptimization && ' モバイル最適化'}
              {settings.enableMetrics && ' 統計表示'}
            </div>
            <div>同時リクエスト: 最大{settings.maxConcurrentRequests || 3}件</div>
            {settings.region && <div>リージョン: {settings.region}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * クイック設定コンポーネント（コンパクト版）
 */
interface QuickTTSSettingsProps {
  currentVoice: 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c';
  currentQuality: 'standard' | 'premium';
  currentEngine: 'standard' | 'chirp3hd';
  onVoiceChange: (voice: 'neural2-a' | 'neural2-c' | 'chirp3hd-a' | 'chirp3hd-c') => void;
  onQualityChange: (quality: 'standard' | 'premium') => void;
  onEngineChange: (engine: 'standard' | 'chirp3hd') => void;
  className?: string;
}

export const QuickTTSSettings: React.FC<QuickTTSSettingsProps> = ({
  currentVoice,
  currentQuality,
  currentEngine,
  onVoiceChange,
  onQualityChange,
  onEngineChange,
  className = ''
}) => {
  const getVoiceLabel = (voice: string) => {
    if (voice.includes('chirp3hd')) {
      return voice.includes('a') ? '👩 Chirp3HD-A' : '👨 Chirp3HD-C';
    }
    return voice.includes('a') ? '👩 Standard-A' : '👨 Standard-C';
  };

  return (
    <div className={`flex items-center space-x-4 p-2 bg-gray-50 rounded-md ${className}`}>
      {/* エンジン切替 */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">エンジン:</span>
        <button
          onClick={() => onEngineChange(currentEngine === 'standard' ? 'chirp3hd' : 'standard')}
          className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
        >
          {currentEngine === 'chirp3hd' ? '🚀 Chirp3HD' : '📱 Standard'}
        </button>
      </div>

      {/* 音声切替 */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">音声:</span>
        <button
          onClick={() => {
            if (currentEngine === 'chirp3hd') {
              onVoiceChange(currentVoice === 'chirp3hd-a' ? 'chirp3hd-c' : 'chirp3hd-a');
            } else {
              onVoiceChange(currentVoice === 'neural2-a' ? 'neural2-c' : 'neural2-a');
            }
          }}
          className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
        >
          {getVoiceLabel(currentVoice)}
        </button>
      </div>

      {/* 品質切替 */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">品質:</span>
        <button
          onClick={() => onQualityChange(currentQuality === 'standard' ? 'premium' : 'standard')}
          className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
        >
          {currentQuality === 'premium' ? '⭐ プレミアム' : '📱 標準'}
        </button>
      </div>
    </div>
  );
};