/**
 * モバイル環境でのTTS互換性チェッカー
 */

import React, { useState, useEffect } from 'react';
import { getDeviceInfo, checkMobileTTSSupport, logVoiceDetails, waitForVoices } from '../utils/deviceDetection';
import type { DeviceInfo } from '../utils/deviceDetection';

interface MobileCompatibilityCheckerProps {
  className?: string;
}

export const MobileCompatibilityChecker: React.FC<MobileCompatibilityCheckerProps> = ({
  className = ''
}) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [ttsSupport, setTtsSupport] = useState<ReturnType<typeof checkMobileTTSSupport> | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const initializeInfo = async () => {
      // 音声の読み込みを待機
      await waitForVoices();
      
      const info = getDeviceInfo();
      const support = checkMobileTTSSupport();
      
      setDeviceInfo(info);
      setTtsSupport(support);
      
      // デバッグ情報をコンソールに出力
      logVoiceDetails();
    };

    initializeInfo();
  }, []);

  if (!deviceInfo || !ttsSupport) {
    return (
      <div className={`p-4 bg-gray-100 rounded-lg ${className}`}>
        <div className="animate-pulse">デバイス情報を取得中...</div>
      </div>
    );
  }

  const StatusBadge = ({ condition, label }: { condition: boolean; label: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full ${
      condition 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {condition ? '✅' : '❌'} {label}
    </span>
  );

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            🔍 モバイル互換性チェック
          </h3>
          <button className="text-gray-500">
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge condition={!deviceInfo.isMobile} label="デスクトップ" />
          <StatusBadge condition={ttsSupport.canUseGoogleCloudTTS} label="Google Cloud TTS" />
          <StatusBadge condition={ttsSupport.canUseWebSpeechTTS} label="Web Speech TTS" />
          <StatusBadge condition={deviceInfo.thaiVoices.length > 1} label="複数音声" />
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* デバイス情報 */}
          <div>
            <h4 className="font-medium mb-2">📱 デバイス情報</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>モバイル: {deviceInfo.isMobile ? 'はい' : 'いいえ'}</div>
              <div>iOS: {deviceInfo.isIOS ? 'はい' : 'いいえ'}</div>
              <div>Android: {deviceInfo.isAndroid ? 'はい' : 'いいえ'}</div>
              <div>ブラウザ: {deviceInfo.browser}</div>
            </div>
          </div>

          {/* TTS対応状況 */}
          <div>
            <h4 className="font-medium mb-2">🎵 TTS対応状況</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className={`p-2 rounded ${
                ttsSupport.recommendedMethod === 'google-cloud' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <strong>推奨方法:</strong> {
                  ttsSupport.recommendedMethod === 'google-cloud' 
                    ? 'Google Cloud TTS (高品質)' 
                    : ttsSupport.recommendedMethod === 'web-speech'
                    ? 'Web Speech API (標準)'
                    : 'TTS利用不可'
                }
              </div>
            </div>
          </div>

          {/* 利用可能な音声 */}
          <div>
            <h4 className="font-medium mb-2">🎤 タイ語音声 ({deviceInfo.thaiVoices.length}件)</h4>
            {deviceInfo.thaiVoices.length > 0 ? (
              <div className="space-y-1">
                {(deviceInfo.thaiVoices || []).map((voice, index) => (
                  <div key={index} className="text-xs p-2 bg-gray-50 rounded flex justify-between">
                    <span>{voice.name}</span>
                    <span className={`px-1 rounded ${
                      voice.localService ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {voice.localService ? 'ローカル' : 'リモート'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 p-2 bg-gray-50 rounded">
                タイ語音声が見つかりません
              </div>
            )}
          </div>

          {/* 既知の問題 */}
          {ttsSupport.issues.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">⚠️ 既知の問題</h4>
              <div className="space-y-1">
                {(ttsSupport.issues || []).map((issue, index) => (
                  <div key={index} className="text-xs text-orange-800 bg-orange-50 p-2 rounded">
                    {issue}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 対処法 */}
          {deviceInfo.isMobile && (
            <div>
              <h4 className="font-medium mb-2">💡 モバイル環境での対処法</h4>
              <div className="text-xs space-y-1">
                <div className="p-2 bg-blue-50 rounded">
                  <strong>Google Cloud TTS使用:</strong> 高品質なChirp3-HD音声が利用可能
                </div>
                <div className="p-2 bg-yellow-50 rounded">
                  <strong>Web Speech API制限:</strong> システム音声（Kanya等）のみ選択可能
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <strong>推奨:</strong> Google Cloud TTS経由で多様な音声を利用
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};