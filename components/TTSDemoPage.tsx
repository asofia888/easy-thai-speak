/**
 * Google Cloud TTS デモページ
 * 音声設定を動的に変更して効果を確認できる
 */

import React, { useState, useCallback } from 'react';
import { ThaiSpeechPlayer } from './ThaiSpeechPlayer';
import { TTSSettings } from './TTSSettings';
import { MobileCompatibilityChecker } from './MobileCompatibilityChecker';
import type { GoogleCloudTTSConfig } from '../services/googleCloudTTSService';

const TTSDemoPage: React.FC = () => {
  const [ttsConfig, setTtsConfig] = useState<GoogleCloudTTSConfig>({
    voice: 'neural2-a',
    quality: 'premium',
    region: 'us-central1'
  });

  const [debugMode, setDebugMode] = useState(true); // デフォルトでON

  const handleSettingsChange = useCallback((newSettings: GoogleCloudTTSConfig) => {
    console.log('🔧 設定変更:', newSettings);
    setTtsConfig(newSettings);
  }, []);

  console.log('🔄 TTSDemoPage rendered with config:', ttsConfig);

  const demoTexts = [
    {
      id: 'greeting',
      thai: 'สวัสดีครับ ผมชื่อโทมัส',
      paiboon: 'sà-wàt-dii khráp phǒm chɯ̂ɯ thoo-mát',
      japanese: 'こんにちは、私の名前はトーマスです',
      level: 'beginner' as const
    },
    {
      id: 'thanks',
      thai: 'ขอบคุณมากครับ',
      paiboon: 'khɔ̀ɔp-khun mâak khráp',
      japanese: 'どうもありがとうございます',
      level: 'intermediate' as const
    },
    {
      id: 'weather',
      thai: 'วันนี้อากาศดีมาก',
      paiboon: 'wan-níi aa-kàat dii mâak',
      japanese: '今日はとても良い天気です',
      level: 'advanced' as const
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Google Cloud TTS デモ</h1>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
              className="mr-2"
            />
            デバッグモード
          </label>
        </div>
      </div>

      {/* 現在の設定表示 */}
      {debugMode && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">🔍 現在の設定</h3>
          <pre className="text-xs text-gray-700">
            {JSON.stringify(ttsConfig, null, 2)}
          </pre>
        </div>
      )}

      {/* モバイル互換性チェック */}
      <MobileCompatibilityChecker className="mb-4" />

      {/* 設定パネル */}
      <TTSSettings 
        showAdvancedOptions={true} 
        onSettingsChange={handleSettingsChange}
        className="sticky top-4"
      />

      {/* 音声テストセクション */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🎵 音声テスト</h2>
        
        <div className="bg-yellow-100 p-3 rounded-lg text-sm">
          <div>Demo texts count: {demoTexts.length}</div>
          <div>Config: {JSON.stringify(ttsConfig)}</div>
        </div>
        
        {demoTexts.map((demo, index) => {
          console.log(`🔄 Rendering demo ${index}:`, demo);
          return (
            <div key={demo.id} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-2 text-sm text-gray-600">
                デモ {index + 1}: {demo.id}
              </div>
              
              <ThaiSpeechPlayer
                thaiText={demo.thai}
                paiboonText={demo.paiboon}
                japaneseText={demo.japanese}
                learningLevel={demo.level}
                showMetrics={true}
                // 設定を動的に適用
                voiceOverride={ttsConfig.voice}
                qualityOverride={ttsConfig.quality}
                key={`${demo.id}-${ttsConfig.voice}-${ttsConfig.quality}`}
              />
              
              {debugMode && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                  <div>ID: {demo.id}</div>
                  <div>レベル: {demo.level}</div>
                  <div>音声: {ttsConfig.voice}</div>
                  <div>品質: {ttsConfig.quality}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 比較テスト */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🔄 比較テスト</h2>
        <p className="text-sm text-gray-600">
          同じテキストを異なる設定で比較できます
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">👩 女性音声 (neural2-a)</h3>
            <ThaiSpeechPlayer
              thaiText="สวัสดีค่ะ ดิฉันชื่อแอน"
              paiboonText="sà-wàt-dii khâ dì-chǎn chɯ̂ɯ ɛɛn"
              japaneseText="こんにちは、私の名前はアンです"
              learningLevel="intermediate"
              showMetrics={false}
              // 女性音声を強制
              voiceOverride="neural2-a"
              qualityOverride={ttsConfig.quality}
              key={`female-${ttsConfig.quality}-${Date.now()}`}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">👨 男性音声 (neural2-c)</h3>
            <ThaiSpeechPlayer
              thaiText="สวัสดีครับ ผมชื่อจอห์น"
              paiboonText="sà-wàt-dii khráp phǒm chɯ̂ɯ jɔɔn"
              japaneseText="こんにちは、私の名前はジョンです"
              learningLevel="intermediate"
              showMetrics={false}
              // 男性音声を強制
              voiceOverride="neural2-c"
              qualityOverride={ttsConfig.quality}
              key={`male-${ttsConfig.quality}-${Date.now()}`}
            />
          </div>
        </div>
      </div>

      {/* 使用統計 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💰 使用統計</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium">リクエスト数</div>
            <div className="text-lg">-</div>
          </div>
          <div>
            <div className="font-medium">キャッシュ率</div>
            <div className="text-lg">-</div>
          </div>
          <div>
            <div className="font-medium">平均レイテンシ</div>
            <div className="text-lg">-</div>
          </div>
          <div>
            <div className="font-medium">推定コスト</div>
            <div className="text-lg">-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSDemoPage;