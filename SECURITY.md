# セキュリティガイドライン

## API キー管理

### ⚠️ 重要なセキュリティ対策

1. **実際のAPIキーをコードにコミットしない**
   - `.env.server` ファイルは実際のAPIキーを含めないでください
   - 本番環境では環境変数として設定してください

2. **環境変数の設定**

   **Vercel環境での設定:**
   ```bash
   # Vercelの環境変数として以下を設定
   GEMINI_API_KEY=your_actual_gemini_api_key
   GOOGLE_CLOUD_API_KEY=your_actual_google_cloud_api_key
   ```

3. **ローカル開発環境**
   ```bash
   # .env.server に実際のAPIキーを設定（Gitにはコミットしない）
   GEMINI_API_KEY=your_actual_gemini_api_key
   GOOGLE_CLOUD_API_KEY=your_actual_google_cloud_api_key
   ```

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

**注意**: このドキュメントは機密情報を含まないため、Gitで管理しても安全です。