# 🚨 緊急セキュリティ警告

## 発見されたセキュリティ問題

**重大度**: 緊急

**問題**: Gitコミット履歴に実際のGoogle APIキーが含まれていることが発見されました。

### 漏洩したAPIキー

- コミット: `c49fa26b93be3cf5d0f33ba66fa8fa22b0867da5`
- ファイル: `.env.server`
- APIキー: `AIzaSyBUcVLZ_-XyuPa2lue2AFID_gfIGi5sRXU`

### 即座に実行すべき対策

1. **APIキーを即座に無効化**
   ```
   Google Cloud Console → 認証情報 → APIキー → 該当キーを削除
   ```

2. **新しいAPIキーを生成**
   ```
   Google Cloud Console → 認証情報 → APIキーを作成
   ```

3. **環境変数を更新**
   ```
   Vercel → Settings → Environment Variables → GEMINI_API_KEY を新しいキーで更新
   ```

4. **Git履歴からキーを削除** (高度なユーザー向け)
   ```bash
   # BFGツールを使用 (推奨)
   java -jar bfg.jar --replace-text replacements.txt
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push --force-with-lease --all
   
   # または git filter-branch を使用
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env.server' \
   --prune-empty --tag-name-filter cat -- --all
   ```

### 確認事項

- [ ] 漏洩したAPIキーを無効化済み
- [ ] 新しいAPIキーを生成済み
- [ ] Vercel環境変数を更新済み
- [ ] Git履歴から機密情報を削除済み
- [ ] セキュリティログを確認済み

### 今後の予防策

1. **プリコミットフック**の設定
2. **シークレットスキャン**の自動化
3. **定期的なセキュリティ監査**

---
**作成日時**: $(date)
**優先度**: 最高
**状態**: 対応必要