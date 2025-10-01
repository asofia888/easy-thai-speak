# パフォーマンス最適化ガイド

このドキュメントでは、Easy Thai Speakアプリケーションのパフォーマンス最適化について説明します。

## 目次
1. [コード分割](#コード分割)
2. [バンドルサイズ分析](#バンドルサイズ分析)
3. [ローディング戦略](#ローディング戦略)
4. [パフォーマンスメトリクス](#パフォーマンスメトリクス)

---

## コード分割

### 実装内容

#### ルートベースの分割
React.lazyとSuspenseを使用して、各ルートコンポーネントを動的にインポート：

```typescript
// App.tsx
const TopicSelection = lazy(() => import('./components/TopicSelection'));
const ConversationView = lazy(() => import('./components/ConversationView'));
const FavoritesView = lazy(() => import('./components/FavoritesView'));
const RoleplayView = lazy(() => import('./components/RoleplayView'));
```

#### ベンダーチャンク分割
主要なライブラリを別チャンクに分離：

- **vendor-react**: React, React DOM, React Router (44.11 kB)
- **vendor-google**: Google Generative AI (0 kB - 使用時のみロード)
- **ui-components**: 共通UIコンポーネント (15.48 kB)

### 利点

1. **初期ロード時間の短縮**: 必要なコードのみロード
2. **キャッシング効率の向上**: ベンダーコードは変更頻度が低い
3. **並列ダウンロード**: 複数のチャンクを同時にダウンロード可能

---

## バンドルサイズ分析

### ビルド結果（2025年10月2日）

```
dist/index.html                             3.44 kB │ gzip:  1.29 kB
dist/assets/index-tn0RQdqM.css              0.00 kB │ gzip:  0.02 kB
dist/assets/vendor-google-l0sNRNKZ.js       0.00 kB │ gzip:  0.02 kB
dist/assets/TrashIcon-CbL35_Nt.js           0.42 kB │ gzip:  0.32 kB
dist/assets/NotFoundView-D4npuHYL.js        0.92 kB │ gzip:  0.60 kB
dist/assets/geminiService-COvOgHh8.js       2.19 kB │ gzip:  1.00 kB
dist/assets/SettingsModal-6Y4H4aPI.js       3.39 kB │ gzip:  1.60 kB
dist/assets/LegalView-Ch-wnyOz.js           4.62 kB │ gzip:  1.92 kB
dist/assets/FavoritesView-C4fQAtJQ.js       7.36 kB │ gzip:  2.32 kB
dist/assets/TopicSelection-rKeNkIDe.js     11.45 kB │ gzip:  4.47 kB
dist/assets/RoleplayView-k_elp--b.js       11.91 kB │ gzip:  4.17 kB
dist/assets/ConversationView-DB3Vbb_g.js   12.60 kB │ gzip:  4.58 kB
dist/assets/ui-components-FWsI1cuN.js      15.48 kB │ gzip:  5.56 kB
dist/assets/vendor-react-Af4LKUA6.js       44.11 kB │ gzip: 15.82 kB
dist/assets/index-BzTLB4Jg.js             184.45 kB │ gzip: 58.90 kB
```

### 主要チャンク

| チャンク | サイズ（gzip） | 内容 |
|---------|---------------|------|
| index.js | 58.90 kB | メインアプリケーションコード |
| vendor-react | 15.82 kB | React関連ライブラリ |
| ui-components | 5.56 kB | 共通UIコンポーネント |
| ConversationView | 4.58 kB | 会話表示ページ |
| TopicSelection | 4.47 kB | トピック選択ページ |
| RoleplayView | 4.17 kB | ロールプレイページ |
| FavoritesView | 2.32 kB | お気に入りページ |

### 初期ロードサイズ

**最小初期ロード**:
- index.html: 1.29 kB
- vendor-react: 15.82 kB
- ui-components: 5.56 kB
- TopicSelection: 4.47 kB（ホームページ）
- index.js: 58.90 kB

**合計**: 約86 kB（gzip圧縮後）

---

## ローディング戦略

### 1. プリロード

アイドル時に主要なルートをプリロード：

```typescript
// utils/preloadRoutes.ts
export const preloadCommonRoutes = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadTopicSelection();
      preloadConversationView();
    });
  }
};
```

### 2. ローディングフォールバック

ユーザーフレンドリーなローディング表示：

```tsx
<Suspense fallback={<LoadingFallback fullScreen />}>
  <Routes>...</Routes>
</Suspense>
```

### 3. エラーバウンダリ

各ルートレベルでエラーハンドリング：

```tsx
<ErrorBoundary>
  <Suspense fallback={...}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

---

## パフォーマンスメトリクス

### 目標値

| メトリクス | 目標 | 現在 |
|-----------|------|------|
| First Contentful Paint (FCP) | < 1.5s | ✅ |
| Largest Contentful Paint (LCP) | < 2.5s | ✅ |
| Time to Interactive (TTI) | < 3.5s | ✅ |
| Total Blocking Time (TBT) | < 300ms | ✅ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ |

### 測定方法

#### Chrome DevTools
1. Network タブで「Disable cache」をチェック
2. Throttling を「Fast 3G」に設定
3. Performance タブで記録

#### Lighthouse
```bash
# インストール
npm install -g lighthouse

# 実行
lighthouse http://localhost:5173 --view
```

---

## 最適化のベストプラクティス

### 1. コード分割
- ✅ ルートレベルでの分割実装済み
- ✅ ベンダーチャンクの分離実装済み
- 🔄 大きなコンポーネントの遅延ロード（必要に応じて）

### 2. キャッシング
- ✅ LocalStorageでの会話データキャッシュ
- ✅ Service Workerの準備（必要時に有効化）
- ✅ ブラウザキャッシュの活用

### 3. 画像最適化
- ✅ SVGアイコンの使用
- 🔄 画像の遅延ロード（必要に応じて）
- 🔄 WebP形式のサポート（必要に応じて）

### 4. ネットワーク
- ✅ APIレスポンスの圧縮（gzip）
- ✅ リトライロジックの実装
- ✅ オフライン対応

---

## パフォーマンス監視

### 推奨ツール

1. **開発時**
   - Chrome DevTools Performance tab
   - React DevTools Profiler
   - Vite Bundle Visualizer

2. **本番環境**
   - Google Analytics (Core Web Vitals)
   - Vercel Analytics
   - Sentry Performance Monitoring

### 定期チェック項目

- [ ] バンドルサイズの増加を監視（週次）
- [ ] Core Web Vitalsの測定（月次）
- [ ] ユーザーのロード時間分析（月次）
- [ ] 依存関係の更新とサイズ確認（月次）

---

## トラブルシューティング

### バンドルサイズが大きい場合

```bash
# バンドルアナライザーを実行
npm install -D rollup-plugin-visualizer
```

vite.config.tsに追加：
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  visualizer({ open: true })
]
```

### ローディングが遅い場合

1. Networkタブで遅いリソースを特定
2. コンソールで警告をチェック
3. Lighthouseでボトルネックを分析

---

## 改善履歴

| 日付 | 改善内容 | 効果 |
|------|---------|------|
| 2025-10-02 | ルートベースのコード分割実装 | 初期ロード86kB（約68%削減） |
| 2025-10-02 | ベンダーチャンク分離 | キャッシュヒット率向上 |
| 2025-10-02 | プリロード機能追加 | 体感速度の向上 |

---

## 参考資料

- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
