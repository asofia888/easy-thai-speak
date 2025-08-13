# Google Cloud Text-to-Speech Chirp3HD セットアップガイド

## 概要

このプロジェクトでは、Google Cloud Text-to-Speech APIのChirp3HDモデルを使用して、高品質なタイ語音声合成を提供しています。

## 特徴

- 🎵 **高品質音声**: Google Cloud Chirp3HDによる自然なタイ語音声
- 🔤 **タイ文字フィルタリング**: Paiboon+や日本語を除外し、純粋なタイ文字のみをTTSに送信
- 💾 **インテリジェントキャッシュ**: 使用頻度と期限を考慮したLRUキャッシュ
- 📊 **コスト最適化**: リクエスト数と文字数の追跡による費用管理
- 🎚️ **学習レベル対応**: 初心者、中級者、上級者向けの音声設定

## セットアップ手順

### 1. Google Cloud Console設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. Text-to-Speech APIを有効化:
   ```bash
   gcloud services enable texttospeech.googleapis.com
   ```

### 2. サービスアカウント作成

1. Google Cloud Console > IAM > サービスアカウント
2. 「サービスアカウントを作成」をクリック
3. 以下の権限を付与:
   - Cloud Text-to-Speech Client
   - プロジェクト閲覧者
4. キーファイル（JSON）をダウンロード

### 3. 環境変数設定

クライアント側は Vite の接頭辞 `VITE_` を使用します（秘密情報は含めない）。

```env
# client/.env
VITE_TTS_DEFAULT_VOICE=neural2-a
VITE_TTS_DEFAULT_QUALITY=premium
VITE_GOOGLE_CLOUD_REGION=us-central1
```

サーバ側は Google 認証情報を環境変数で設定します。

```env
# server/.env
GOOGLE_APPLICATION_CREDENTIALS=./keys/google-cloud-key.json
GOOGLE_CLOUD_PROJECT=your-project-id
```

### 4. 依存関係インストール

```bash
npm install @google-cloud/text-to-speech
```

## 使用方法

### 基本的な使用

```tsx
import { useGoogleCloudTTS } from './hooks/useGoogleCloudTTS';

const MyComponent = () => {
  const [ttsState, ttsControls] = useGoogleCloudTTS({
    voice: 'neural2-a',
    quality: 'premium',
    autoPlay: true
  });

  const handleSpeak = async () => {
    await ttsControls.synthesize({
      thaiText: 'สวัสดีครับ',
      options: {
        learningLevel: 'beginner',
        speed: 0.8
      }
    });
  };

  return (
    <button onClick={handleSpeak} disabled={ttsState.isLoading}>
      {ttsState.isLoading ? '合成中...' : '再生'}
    </button>
  );
};
```

### コンポーネントでの使用

```tsx
import { ThaiSpeechPlayer } from './components/ThaiSpeechPlayer';

const MyLearningComponent = () => {
  return (
    <ThaiSpeechPlayer
      thaiText="สวัสดีครับ ยินดีที่ได้รู้จัก"
      paiboonText="sà-wàt-dii khráp yin-dii thîi dâai rúu-jàk"
      japaneseText="こんにちは、お会いできて嬉しいです"
      learningLevel="intermediate"
      showMetrics={true}
    />
  );
};
```

## API設定オプション

### 音声設定

- **neural2-a**: 女性風の自然な音声
- **neural2-c**: 男性風の自然な音声

### 品質設定

- **standard**: 標準品質（低コスト）
- **premium**: プレミアム品質（高コスト、高品質）

### 学習レベル設定

```typescript
const learningSettings = {
  beginner: { 
    speed: 0.7,      // ゆっくり
    pitch: 0.0,      // 標準ピッチ
    useSSML: true,   // 強調表現使用
    emphasis: 'clarity' // 明瞭性重視
  },
  intermediate: { 
    speed: 0.85,     // やや遅め
    useSSML: false 
  },
  advanced: { 
    speed: 1.0,      // 標準速度
    useSSML: false 
  }
};
```

## コスト管理

### 料金体系（2024年時点）

- 標準音声: $4 per 1M characters
- プレミアム音声（Chirp3HD）: $16 per 1M characters

### コスト最適化機能

1. **インテリジェントキャッシュ**
   - よく使用されるフレーズを自動キャッシュ
   - LRU（Least Recently Used）による効率的な管理
   - 7日間のキャッシュ保持期間

2. **バッチ処理**
   - 複数のテキストを効率的に一括処理
   - 同時リクエスト数の制限（デフォルト: 5）

3. **使用量監視**
   - リアルタイムでのリクエスト数追跡
   - 文字数カウントによる費用推定
   - キャッシュヒット率の監視

## パフォーマンス最適化

### プリロード機能

```typescript
// よく使用されるフレーズの事前キャッシュ
const commonPhrases = [
  'สวัสดี', 'ขอบคุณ', 'ขอโทษ', 
  'ใช่', 'ไม่ใช่', 'ดี', 'ไม่ดี'
];

await ttsControls.preloadPhrases(commonPhrases);
```

### キャッシュ戦略

- **メモリベース**: 高速アクセスのためメモリにキャッシュ
- **頻度ベース**: 使用頻度の高いアイテムを優先保持
- **期限ベース**: 7日経過後に自動削除

## トラブルシューティング

### よくある問題

1. **認証エラー**
   ```
   Error: Could not load the default credentials
   ```
   → 環境変数とサービスアカウントキーを確認

2. **API無効エラー**
   ```
   Error: Text-to-Speech API has not been used
   ```
   → Google Cloud ConsoleでText-to-Speech APIを有効化

3. **権限エラー**
   ```
   Error: The caller does not have permission
   ```
   → サービスアカウントの権限を確認

### デバッグ設定

```env
REACT_APP_DEBUG_TTS=true
REACT_APP_ENABLE_TTS_METRICS=true
```

デバッグモードでは詳細なログが出力されます：

```typescript
const debugInfo = debugThaiText('สวัสดี Hello สบายดี');
console.log(debugInfo);
// {
//   original: 'สวัสดี Hello สบายดี',
//   extracted: 'สวัสดี สบายดี',
//   analysis: { quality: 'high', isValid: true, ... }
// }
```

## セキュリティ考慮事項

1. **キーファイル管理**
   - サービスアカウントキーは安全な場所に保存
   - `.gitignore`でバージョン管理から除外
   - 本番環境では環境変数または秘密管理サービスを使用

2. **アクセス制限**
   - サービスアカウントには最小権限の原則を適用
   - IP制限やAPIキー制限を検討

3. **ログ管理**
   - 音声データやテキストの機密情報をログに含めない
   - エラーログの適切な管理

## 追加リソース

- [Google Cloud Text-to-Speech Documentation](https://cloud.google.com/text-to-speech/docs)
- [Thai Language Support](https://cloud.google.com/text-to-speech/docs/voices)
- [Pricing Calculator](https://cloud.google.com/products/calculator)

## サポート

問題が発生した場合は、以下の情報を含めてissueを作成してください：

- エラーメッセージの詳細
- 使用している環境（OS、Node.jsバージョンなど）
- 再現手順
- 設定情報（機密情報は除く）