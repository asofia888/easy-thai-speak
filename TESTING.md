# テストガイド

このプロジェクトには、包括的なテストスイートが実装されています。

## テストの種類

### 1. 単体テスト・統合テスト (Vitest + React Testing Library)

#### カスタムフック
- `hooks/useConversationData.test.ts` - 会話データの取得とキャッシング
- `hooks/useRoleplay.test.ts` - ロールプレイ機能のステート管理

#### コンポーネント
- `components/ConversationCard.test.tsx` - 会話カードの表示とインタラクション
- `components/TopicSelection.test.tsx` - トピック選択ページ

#### Context Providers
- `contexts/FavoritesContext.test.tsx` - お気に入り管理とSRSアルゴリズム

#### サービス
- `services/geminiService.test.ts` - Gemini API統合とエラーハンドリング

### 2. E2Eテスト (Playwright)

#### ユーザーフロー
- `e2e/topic-selection.spec.ts` - トピック選択とナビゲーション
- `e2e/conversation-view.spec.ts` - 会話表示とリスニングモード
- `e2e/favorites.spec.ts` - お気に入り機能

## テストの実行

### 単体テスト・統合テスト

```bash
# 監視モードでテスト実行
npm run test

# UIモードでテスト実行
npm run test:ui

# カバレッジレポート生成
npm run test:coverage
```

### E2Eテスト

```bash
# E2Eテスト実行
npm run test:e2e

# UIモードでE2Eテスト実行
npm run test:e2e:ui

# すべてのテストを実行
npm run test:all
```

## テストカバレッジ目標

- **カスタムフック**: 80%以上
- **コアコンポーネント**: 70%以上
- **Context Providers**: 80%以上
- **サービス層**: 85%以上
- **E2E (クリティカルフロー)**: 主要な3つのユーザーフロー

## テスト作成のベストプラクティス

### 1. 単体テスト

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useCustomHook', () => {
  beforeEach(() => {
    // セットアップ処理
  });

  it('should handle success case', () => {
    // テストケース
  });

  it('should handle error case', () => {
    // エラーケース
  });
});
```

### 2. コンポーネントテスト

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(/* assertion */);
  });
});
```

### 3. E2Eテスト

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete user flow', async ({ page }) => {
    // ユーザーアクションをシミュレート
    await page.click('button');
    await expect(page).toHaveURL('/expected-url');
  });
});
```

## モックとスタブ

### API呼び出しのモック

```typescript
vi.mock('../services/geminiService');

vi.spyOn(geminiService, 'generateConversation').mockResolvedValue(mockData);
```

### Web APIのモック

```typescript
// tests/setup.ts で定義
global.speechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  // ...
};
```

## CI/CD統合

GitHub Actions等のCI環境でテストを自動実行する場合：

```yaml
- name: Run tests
  run: |
    npm run test -- --run
    npm run test:coverage

- name: Run E2E tests
  run: |
    npm run test:e2e
```

## トラブルシューティング

### Vitestがタイムアウトする場合

```typescript
// テストファイルで
test('long running test', async () => {
  // ...
}, { timeout: 10000 }); // 10秒に延長
```

### Playwrightがブラウザを起動できない場合

WSL環境の場合、依存関係が不足している可能性があります：

```bash
sudo npx playwright install-deps
```

## テストカバレッジレポート

テストカバレッジは `npm run test:coverage` 実行後、`coverage/` ディレクトリに生成されます。

- `coverage/index.html` - HTMLレポート
- `coverage/lcov.info` - LCOV形式（CI統合用）

## 継続的な改善

- 新機能追加時には必ずテストも追加
- カバレッジが低い部分を定期的にレビュー
- E2Eテストは主要なユーザーフローに集中
- モックを適切に使用してテストを高速化
