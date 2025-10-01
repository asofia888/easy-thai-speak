import { test, expect } from '@playwright/test';

test.describe('Topic Selection Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.getByText('タイ語会話練習')).toBeVisible();
  });

  test('should display custom topic generator', async ({ page }) => {
    await expect(page.getByText('カスタムトピックを生成')).toBeVisible();
    await expect(page.getByPlaceholder('会話のテーマを入力...')).toBeVisible();
  });

  test('should display topic categories', async ({ page }) => {
    await expect(page.getByText('日常会話')).toBeVisible();
  });

  test('should enable submit button when text is entered', async ({ page }) => {
    const input = page.getByPlaceholder('会話のテーマを入力...');
    const submitButton = page.getByRole('button', { name: /会話を生成/i });

    await expect(submitButton).toBeDisabled();

    await input.fill('カスタムトピック');
    await expect(submitButton).toBeEnabled();
  });

  test('should navigate to conversation page when custom topic is submitted', async ({ page }) => {
    const input = page.getByPlaceholder('会話のテーマを入力...');
    const submitButton = page.getByRole('button', { name: /会話を生成/i });

    await input.fill('空港での会話');
    await submitButton.click();

    await expect(page).toHaveURL(/\/conversation\/custom-/);
    await expect(page.getByText('空港での会話')).toBeVisible();
  });

  test('should navigate when clicking a topic card', async ({ page }) => {
    // Find and click the first topic card
    const topicCard = page.getByRole('button').filter({ hasText: '挨拶' }).first();
    await topicCard.click();

    await expect(page).toHaveURL(/\/conversation\//);
  });

  test('should show roleplay and favorites buttons', async ({ page }) => {
    await expect(page.getByText('ロールプレイモード')).toBeVisible();
    await expect(page.getByText('お気に入り')).toBeVisible();
  });
});
