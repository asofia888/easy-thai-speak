/**
 * デバイス検出とTTS対応状況確認ユーティリティ
 */

export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  browser: string;
  supportsWebSpeech: boolean;
  supportsSpeechSynthesis: boolean;
  availableVoices: SpeechSynthesisVoice[];
  thaiVoices: SpeechSynthesisVoice[];
}

/**
 * デバイス情報とTTS対応状況を取得
 */
export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  
  let browser = 'unknown';
  if (userAgent.includes('chrome')) browser = 'chrome';
  else if (userAgent.includes('firefox')) browser = 'firefox';
  else if (userAgent.includes('safari')) browser = 'safari';
  else if (userAgent.includes('edge')) browser = 'edge';

  const supportsWebSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const supportsSpeechSynthesis = 'speechSynthesis' in window;
  
  let availableVoices: SpeechSynthesisVoice[] = [];
  let thaiVoices: SpeechSynthesisVoice[] = [];
  
  if (supportsSpeechSynthesis) {
    availableVoices = speechSynthesis.getVoices();
    thaiVoices = availableVoices.filter(voice => 
      voice.lang.startsWith('th') || voice.name.toLowerCase().includes('thai')
    );
  }

  return {
    isMobile,
    isIOS,
    isAndroid,
    browser,
    supportsWebSpeech,
    supportsSpeechSynthesis,
    availableVoices,
    thaiVoices
  };
};

/**
 * モバイル環境でのTTS利用可能性チェック
 */
export const checkMobileTTSSupport = (): {
  canUseGoogleCloudTTS: boolean;
  canUseWebSpeechTTS: boolean;
  recommendedMethod: 'google-cloud' | 'web-speech' | 'none';
  issues: string[];
} => {
  const deviceInfo = getDeviceInfo();
  const issues: string[] = [];
  
  // Google Cloud TTSは基本的にどの環境でも利用可能（API経由）
  const canUseGoogleCloudTTS = true;
  
  // Web Speech APIの利用可能性
  const canUseWebSpeechTTS = deviceInfo.supportsSpeechSynthesis && deviceInfo.thaiVoices.length > 0;
  
  if (deviceInfo.isMobile) {
    issues.push('モバイル環境では音声選択が制限される場合があります');
    
    if (deviceInfo.isIOS) {
      issues.push('iOSではSafariの音声制限があります');
    }
    
    if (deviceInfo.isAndroid) {
      issues.push('Androidではブラウザによって音声が異なります');
    }
  }
  
  if (!canUseWebSpeechTTS) {
    issues.push('Web Speech APIでタイ語音声が利用できません');
  }
  
  // 推奨方法の決定
  let recommendedMethod: 'google-cloud' | 'web-speech' | 'none';
  
  if (canUseGoogleCloudTTS) {
    recommendedMethod = 'google-cloud';
  } else if (canUseWebSpeechTTS) {
    recommendedMethod = 'web-speech';
  } else {
    recommendedMethod = 'none';
  }
  
  return {
    canUseGoogleCloudTTS,
    canUseWebSpeechTTS,
    recommendedMethod,
    issues
  };
};

/**
 * 音声情報の詳細ログ出力
 */
export const logVoiceDetails = (): void => {
  const deviceInfo = getDeviceInfo();
  const ttsSupport = checkMobileTTSSupport();
  
  console.group('🔍 デバイス & TTS 情報');
  
  console.log('📱 デバイス情報:');
  console.log(`  - モバイル: ${deviceInfo.isMobile}`);
  console.log(`  - iOS: ${deviceInfo.isIOS}`);
  console.log(`  - Android: ${deviceInfo.isAndroid}`);
  console.log(`  - ブラウザ: ${deviceInfo.browser}`);
  
  console.log('🎵 TTS対応状況:');
  console.log(`  - Web Speech Recognition: ${deviceInfo.supportsWebSpeech}`);
  console.log(`  - Speech Synthesis: ${deviceInfo.supportsSpeechSynthesis}`);
  console.log(`  - Google Cloud TTS: ${ttsSupport.canUseGoogleCloudTTS}`);
  console.log(`  - Web Speech TTS: ${ttsSupport.canUseWebSpeechTTS}`);
  console.log(`  - 推奨方法: ${ttsSupport.recommendedMethod}`);
  
  console.log('🎤 利用可能な音声:');
  console.log(`  - 全音声数: ${deviceInfo.availableVoices.length}`);
  console.log(`  - タイ語音声数: ${deviceInfo.thaiVoices.length}`);
  
  if (deviceInfo.thaiVoices.length > 0) {
    console.log('  - タイ語音声詳細:');
    deviceInfo.thaiVoices.forEach((voice, index) => {
      console.log(`    ${index + 1}. ${voice.name} (${voice.lang}) - ${voice.localService ? 'ローカル' : 'リモート'}`);
    });
  }
  
  if (ttsSupport.issues.length > 0) {
    console.log('⚠️ 既知の問題:');
    ttsSupport.issues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  console.groupEnd();
};

/**
 * 音声が読み込まれるまで待機（モバイル対応）
 */
export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    
    // 音声が非同期で読み込まれる場合を考慮
    const onVoicesChanged = () => {
      const newVoices = speechSynthesis.getVoices();
      if (newVoices.length > 0) {
        speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(newVoices);
      }
    };
    
    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    
    // タイムアウト（3秒）
    setTimeout(() => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(speechSynthesis.getVoices());
    }, 3000);
  });
};