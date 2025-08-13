/**
 * 環境変数設定ユーティリティ
 * Google Cloud TTS設定の管理と検証
 */

export interface EnvConfig {
  googleCloud: {
    region: string;
    defaultVoice: 'neural2-a' | 'neural2-c';
    defaultQuality: 'standard' | 'premium';
  };
  tts: {
    debugMode: boolean;
    enableMetrics: boolean;
    cacheSize: number;
    cacheDuration: number;
  };
}

/**
 * 環境変数から設定を読み込み
 */
export const getEnvConfig = (): EnvConfig => {
  // Viteのクライアント環境変数を使用
  const env = import.meta.env as any;
  return {
    googleCloud: {
      region: env.VITE_GOOGLE_CLOUD_REGION || 'us-central1',
      defaultVoice: (env.VITE_TTS_DEFAULT_VOICE as 'neural2-a' | 'neural2-c') || 'neural2-a',
      defaultQuality: (env.VITE_TTS_DEFAULT_QUALITY as 'standard' | 'premium') || 'premium'
    },
    tts: {
      debugMode: env.VITE_DEBUG_TTS === 'true',
      enableMetrics: env.VITE_ENABLE_TTS_METRICS === 'true',
      cacheSize: parseInt(env.VITE_TTS_CACHE_SIZE || '1000'),
      cacheDuration: parseInt(env.VITE_TTS_CACHE_DURATION || '604800000')
    }
  };
};

/**
 * 設定の検証
 */
export const validateConfig = (config: EnvConfig): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // サーバ経由に変更したため、クライアント側では資格情報の検証は不要

  // 音声設定の検証
  const validVoices = ['neural2-a', 'neural2-c'];
  if (!validVoices.includes(config.googleCloud.defaultVoice)) {
    errors.push(`❌ 無効な音声設定: ${config.googleCloud.defaultVoice}`);
  }

  const validQualities = ['standard', 'premium'];
  if (!validQualities.includes(config.googleCloud.defaultQuality)) {
    errors.push(`❌ 無効な品質設定: ${config.googleCloud.defaultQuality}`);
  }

  // 数値設定の検証
  if (config.tts.cacheSize < 1 || config.tts.cacheSize > 10000) {
    errors.push('❌ キャッシュサイズは1-10000の範囲で設定してください');
  }

  if (config.tts.cacheDuration < 60000) { // 1分未満
    errors.push('❌ キャッシュ期間は60秒以上で設定してください');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * デバッグ用設定情報出力
 */
export const logConfigStatus = (config: EnvConfig): void => {
  console.group('🔧 Google Cloud TTS 設定状況');
  
  console.log('📋 基本設定:');
  console.log(`  プロジェクトID: ${config.googleCloud.projectId || '❌ 未設定'}`);
  console.log(`  キーファイル: ${config.googleCloud.keyFilename || '❌ 未設定'}`);
  console.log(`  リージョン: ${config.googleCloud.region}`);
  console.log(`  デフォルト音声: ${config.googleCloud.defaultVoice}`);
  console.log(`  デフォルト品質: ${config.googleCloud.defaultQuality}`);
  
  console.log('🎵 TTS設定:');
  console.log(`  デバッグモード: ${config.tts.debugMode ? '✅' : '❌'}`);
  console.log(`  メトリクス: ${config.tts.enableMetrics ? '✅' : '❌'}`);
  console.log(`  キャッシュサイズ: ${config.tts.cacheSize}`);
  console.log(`  キャッシュ期間: ${config.tts.cacheDuration}ms`);

  const validation = validateConfig(config);
  if (validation.isValid) {
    console.log('✅ 設定は正常です');
  } else {
    console.log('❌ 設定に問題があります:');
    validation.errors.forEach(error => console.log(`  ${error}`));
  }
  
  console.groupEnd();
};

/**
 * 設定修正のアドバイス
 */
export const getConfigAdvice = (): string[] => {
  const advice = [
    '🔐 Google Cloud設定手順 (サーバ側):',
    '1. Google Cloud Consoleでプロジェクトを作成',
    '2. Text-to-Speech APIを有効化',
    '3. サービスアカウントを作成し、JSONキーをダウンロード',
    '4. サーバ上に keys/google-cloud-key.json を配置',
    '5. サーバの環境変数 GOOGLE_APPLICATION_CREDENTIALS=./keys/google-cloud-key.json を設定',
    '',
    '📁 サーバ側のファイル配置例:',
    '  keys/google-cloud-key.json  ← ここにキーファイル',
    '  サーバの .env ← 環境変数設定ファイル',
    '',
    '⚙️ クライアント .env 設定例 (任意):',
    '  VITE_TTS_DEFAULT_VOICE=neural2-a',
    '  VITE_TTS_DEFAULT_QUALITY=premium',
    '',
    '💡 詳細な設定ガイド: docs/TTS_SETUP.md を参照'
  ];

  return advice;
};