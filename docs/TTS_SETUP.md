# Google Cloud TTS セットアップガイド

## 概要

このアプリケーションでは、Google Cloud Text-to-Speech APIを使用して高品質なタイ語音声を生成します。Chirp3HD音声エンジンとStandard音声エンジンの両方をサポートしており、モバイルデバイスでも安定した音声再生が可能です。

## 音声エンジンの選択

### 1. Chirp3HD音声エンジン（推奨）
- **特徴**: 最高品質の音声、モバイル対応、自然な発音
- **利用可能な音声**:
  - `th-TH-Chirp3-HD-Achernar` (女性風)
  - `th-TH-Chirp3-HD-Bellatrix` (男性風)
- **用途**: 学習用、本格的な音声合成

### 2. Standard音声エンジン
- **特徴**: 互換性重視、安定性、軽量
- **利用可能な音声**:
  - `th-TH-Standard-A` (女性風)
  - `th-TH-Standard-B` (男性風)
- **用途**: 互換性が必要な場合、軽量な処理

## 環境変数設定

### クライアント側 (.env)
```bash
# Chirp3HD音声を使用する場合（推奨）
VITE_TTS_PREFERRED_ENGINE=chirp3hd
VITE_TTS_DEFAULT_VOICE=chirp3hd-a
VITE_TTS_DEFAULT_QUALITY=premium

# モバイル最適化
VITE_TTS_MOBILE_OPTIMIZATION=true

# デバッグとメトリクス
VITE_DEBUG_TTS=true
VITE_ENABLE_TTS_METRICS=true

# キャッシュ設定
VITE_TTS_CACHE_SIZE=1000
VITE_TTS_CACHE_DURATION=604800000

# リージョン設定（オプション）
VITE_GOOGLE_CLOUD_REGION=us-central1
```

### サーバー側 (.env)
```bash
# Google Cloud認証情報
GOOGLE_APPLICATION_CREDENTIALS=./keys/google-cloud-key.json

# TTSエンジン設定（サーバー側で使用）
TTS_ENGINE=chirp3hd

# Gemini API設定
GEMINI_API_KEY=your_gemini_api_key_here
```

## サーバー側セットアップ

### 1. Google Cloud Consoleでの設定
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを作成または選択
3. Text-to-Speech APIを有効化
4. サービスアカウントを作成
5. JSONキーファイルをダウンロード

### 2. サーバーでのファイル配置
```
server/
├── keys/
│   └── google-cloud-key.json  # ダウンロードしたキーファイル
├── server.js
└── .env                        # 環境変数設定
```

### 3. 環境変数の設定
```bash
# サーバーの .env ファイル
GOOGLE_APPLICATION_CREDENTIALS=./keys/google-cloud-key.json
TTS_ENGINE=chirp3hd
GEMINI_API_KEY=your_gemini_api_key_here
```

## モバイル最適化

### 1. 音声再生の最適化
- **AudioContext.resume()**: ブラウザの自動再生制限を回避
- **MIMEタイプ最適化**: `audio/mpeg`を使用してモバイル互換性を向上
- **プリロード設定**: 音声ファイルの事前読み込み

### 2. 設定オプション
```typescript
// モバイル最適化を有効化
const ttsConfig = {
  preferredEngine: 'chirp3hd',
  voice: 'chirp3hd-a',
  quality: 'premium',
  mobileOptimization: true
};
```

## 音声品質の設定

### 1. 品質レベル
- **Standard**: 標準品質、軽量処理
- **Premium**: 高品質、より自然な音声

### 2. 音声選択
```typescript
// Chirp3HD音声
const chirp3hdVoices = {
  'chirp3hd-a': 'th-TH-Chirp3-HD-Achernar',
  'chirp3hd-c': 'th-TH-Chirp3-HD-Bellatrix'
};

// Standard音声
const standardVoices = {
  'neural2-a': 'th-TH-Standard-A',
  'neural2-c': 'th-TH-Standard-B'
};
```

## トラブルシューティング

### 1. 音声が再生されない場合
- モバイル最適化を有効化
- ブラウザの音声設定を確認
- AudioContextの状態を確認

### 2. 音声品質が低い場合
- Chirp3HDエンジンを使用
- Premium品質を選択
- キャッシュをクリア

### 3. モバイルでの問題
- `VITE_TTS_MOBILE_OPTIMIZATION=true`を設定
- 音声ファイルのプリロードを有効化
- ブラウザの自動再生制限を確認

## パフォーマンス最適化

### 1. キャッシュ設定
- 音声ファイルのキャッシュサイズ: 1000件
- キャッシュ期間: 7日間
- よく使用するフレーズのプリロード

### 2. 同時リクエスト制限
- 最大同時リクエスト数: 3-5件
- セマフォによる制御
- レート制限の回避

## セキュリティ

### 1. APIキーの管理
- クライアント側ではAPIキーを扱わない
- サーバー側で環境変数として管理
- キーファイルは公開リポジトリにコミットしない

### 2. アクセス制御
- CORS設定による適切なアクセス制御
- サーバーサイドでの認証情報管理
- クライアント側での資格情報の露出防止

## 開発・テスト

### 1. ローカル開発
```bash
# フルスタック開発（フロントエンド + バックエンド）
npm run dev:full

# フロントエンドのみ
npm run dev

# バックエンドのみ
npm run server
```

### 2. 音声テスト
- TTSデモページで音声品質を確認
- 異なる音声エンジンでの比較
- モバイルデバイスでの動作確認

### 3. 設定の確認
```typescript
import { logConfigStatus } from '../utils/envConfig';

// 設定状況をログ出力
logConfigStatus(getEnvConfig());
```

## 参考資料

- [Google Cloud Text-to-Speech API ドキュメント](https://cloud.google.com/text-to-speech/docs)
- [Chirp3HD音声について](https://cloud.google.com/text-to-speech/docs/chirp3hd)
- [Vite環境変数の設定](https://vitejs.dev/guide/env-and-mode.html)
- [Web Audio API ドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)