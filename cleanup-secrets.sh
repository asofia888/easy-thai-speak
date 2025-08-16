#!/bin/bash

# 緊急セキュリティ対応: Git履歴からAPIキーを削除

echo "🚨 緊急セキュリティ対応: APIキーをGit履歴から削除します"
echo "⚠️  この操作は不可逆的です。続行しますか? (y/N)"
read -r confirmation

if [[ $confirmation != [yY] ]]; then
    echo "❌ 操作がキャンセルされました"
    exit 1
fi

echo "🔍 バックアップを作成中..."
git branch backup-before-cleanup

echo "🧹 Git履歴から .env.server を削除中..."
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch .env.server' \
--prune-empty --tag-name-filter cat -- --all

echo "🗑️  リフログをクリア中..."
git reflog expire --expire=now --all

echo "🧹 ガベージコレクション実行中..."
git gc --prune=now --aggressive

echo "✅ Git履歴のクリーンアップが完了しました"
echo ""
echo "次の手順:"
echo "1. 漏洩したAPIキーをGoogle Cloud Consoleで無効化"
echo "2. 新しいAPIキーを生成"
echo "3. Vercel環境変数を更新"
echo "4. git push --force-with-lease --all でリモートを更新"
echo ""
echo "⚠️  注意: git push --force-with-lease は慎重に実行してください"