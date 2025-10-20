# セキュリティガイドライン

このドキュメントでは、Easy Thai Speakアプリケーションに実装されているセキュリティ対策について説明します。

## 目次
1. [API キー管理](#api-キー管理)
2. [環境別のセキュリティ](#環境別のセキュリティ)
3. [CORS制限](#cors制限)
4. [レート制限](#レート制限)
5. [入力検証とサニタイゼーション](#入力検証とサニタイゼーション)
6. [セキュリティヘッダー](#セキュリティヘッダー)
7. [セキュリティチェックリスト](#セキュリティチェックリスト)

---

## API キー管理

### ⚠️ **最重要**: 実際のAPIキーは絶対にGitにコミットしない

1. **環境変数ファイルの管理**
   - `.env.local` - ローカル開発用（Gitで追跡されない）
   - `.env.example` - サンプルファイル（実際のキーは含めない）
   - `.env`, `.env.server` - これらもGitにコミットしない

2. **環境変数の設定**

   **ローカル開発環境:**
   ```bash
   # .env.local に実際のAPIキーを設定（Gitには絶対にコミットしない）
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key
   GEMINI_API_KEY=your_actual_gemini_api_key
   ```

   **Vercel本番環境:**
   ```bash
   # Vercelの環境変数として以下を設定
   GEMINI_API_KEY=your_actual_gemini_api_key
   # 注意: VITE_GEMINI_API_KEYは本番環境では設定しない
   ```

---

## 環境別のセキュリティ

### ローカル開発環境

**アーキテクチャ:**
```
ブラウザ → Gemini API（直接呼び出し）
           ↑
           VITE_GEMINI_API_KEY
```

**セキュリティ上の注意:**
- `VITE_`プレフィックス付きの環境変数はブラウザに公開される
- ローカル開発でのみ使用し、本番環境では使用しない
- APIキーの使用量を定期的に監視する

### 本番環境（Vercel）

**アーキテクチャ:**
```
ブラウザ → Vercel Serverless Function → Gemini API
                    ↑
                    GEMINI_API_KEY（サーバーサイドのみ）
```

**セキュリティ対策:**
- APIキーはサーバーサイド（Vercel Serverless Function）でのみ使用
- フロントエンドからは直接APIキーにアクセス不可
- `VITE_`プレフィックス付き変数は設定しない

### 🔒 実装されているセキュリティ機能

1. **サーバサイド認証**
   - APIキーはサーバサイド（Vercel Functions）でのみ使用
   - フロントエンドからは直接APIキーにアクセス不可

2. **環境変数の分離**
   - `.env.server` は `.gitignore` に含まれており、Gitで追跡されない
   - 本番環境では Vercel の環境変数機能を使用

3. **CORS設定**
   - APIエンドポイントに適切なCORSヘッダーを設定

### 🚨 セキュリティチェックリスト

- [ ] `.env.server` に実際のAPIキーが含まれていない
- [ ] Vercel環境変数が正しく設定されている
- [ ] APIキーがコードファイルにハードコードされていない
- [ ] `.gitignore` に環境変数ファイルが含まれている

### 📋 緊急時の対応

APIキーが漏洩した場合:

1. **即座にAPIキーを無効化**
   - Google Cloud Console で該当のAPIキーを削除
   - 新しいAPIキーを生成

2. **新しいAPIキーでの再設定**
   - Vercel環境変数を新しいキーで更新
   - ローカル環境の設定も更新

3. **セキュリティレビュー**
   - コードベースのセキュリティ監査を実施
   - ログの確認と異常なアクセスの有無をチェック

### 🔍 定期的なセキュリティ監査

月次で以下を確認:
- 環境変数の設定状況
- APIキーのアクセスログ
- 不正なアクセスの有無

---

## CORS制限

### 実装内容
本番環境では特定のドメインからのリクエストのみ許可し、不正なオリジンからのアクセスをブロックします。

### 設定方法
Vercelの環境変数に以下を設定：

```bash
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### デフォルト許可ドメイン
- `https://easy-thai-speak.vercel.app`（本番）
- `https://easy-thai-speak-*.vercel.app`（プレビューデプロイメント）
- `http://localhost:5173`（開発環境のみ）
- `http://localhost:3000`（開発環境のみ）

### レスポンス
- **許可**: 200 OK（適切なCORSヘッダー付き）
- **拒否**: 403 Forbidden

---

## レート制限

### 制限内容
- **制限**: 1分間に10リクエスト/IPアドレス
- **対象**: すべてのAPIエンドポイント（`/api/conversation`, `/api/feedback`）
- **超過時**: 429 Too Many Requests

### レスポンスヘッダー
すべてのレスポンスに以下のヘッダーが含まれます：

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 2025-10-02T12:34:56.789Z
```

### カスタマイズ
`api/_middleware.js`で調整可能：

```javascript
const RATE_LIMIT_WINDOW = 60000; // 1分（ミリ秒）
const MAX_REQUESTS_PER_WINDOW = 10; // 最大リクエスト数
```

---

## 入力検証とサニタイゼーション

### トピック入力（会話生成API）

#### 検証ルール
- **文字数制限**: 2〜200文字
- **型チェック**: 文字列型のみ許可

#### サニタイゼーション
以下のパターンを除去：
- HTMLタグ（`<script>`, `<iframe>`, etc.）
- JavaScriptイベントハンドラ（`onclick=`, `onerror=`, etc.）
- 危険な関数呼び出し（`eval()`, `expression()`, `javascript:`, etc.）
- 角括弧（`<`, `>`）

#### エラーレスポンス
```json
{
  "error": "Topic contains invalid characters"
}
```

### 音声フィードバック入力

#### 検証ルール
- **文字数制限**: 各フィールド500文字まで
- **必須フィールド**: `transcript`, `correctPhrase`

---

## セキュリティヘッダー

すべてのAPIレスポンスに以下のヘッダーを付与：

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 各ヘッダーの目的

| ヘッダー | 目的 |
|---------|------|
| `X-Content-Type-Options` | MIMEタイプスニッフィング攻撃を防止 |
| `X-Frame-Options` | クリックジャッキング攻撃を防止 |
| `X-XSS-Protection` | XSS攻撃の検出と防止 |
| `Referrer-Policy` | リファラー情報の漏洩を最小限に |
| `Permissions-Policy` | 不要なブラウザ機能へのアクセスを制限 |

---

## セキュリティチェックリスト

### デプロイ前
- [ ] `GEMINI_API_KEY`がVercel環境変数に設定されている
- [ ] `ALLOWED_ORIGINS`が本番ドメインに設定されている（任意）
- [ ] `.env`ファイルがGitにコミットされていない
- [ ] `.gitignore`に環境変数ファイルが含まれている

### 定期確認
- [ ] レート制限が適切に機能している
- [ ] CORSエラーがログに記録されていない
- [ ] 不審なAPIリクエストパターンがない
- [ ] 依存関係の脆弱性スキャン（`npm audit`）を実施

---

## 脆弱性の報告

セキュリティ上の問題を発見した場合：

1. **公開しない**: GitHubのIssueに投稿しない
2. **直接連絡**: プロジェクト管理者に直接連絡
3. **詳細提供**: 再現手順と影響範囲を明記

---

## 実装ファイル

セキュリティ機能の実装は以下のファイルに含まれています：

- `api/_middleware.js` - セキュリティミドルウェア
- `api/conversation.js` - 会話生成API
- `api/feedback.js` - 発音フィードバックAPI

---

## 参考資料

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security Best Practices](https://vercel.com/docs/security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**注意**: このドキュメントは機密情報を含まないため、Gitで管理しても安全です。