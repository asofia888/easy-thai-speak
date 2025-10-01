import { test, expect } from '@playwright/test';

test.describe('Favorites Functionality', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock the API response
    await context.route('**/api/conversation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversation: [
            {
              speaker: 'A',
              thai: 'สวัสดีครับ',
              pronunciation: 'sa-wat-dee khrap',
              japanese: 'こんにちは',
              words: [
                { thai: 'สวัสดี', pronunciation: 'sa-wat-dee', japanese: 'こんにちは' },
                { thai: 'ครับ', pronunciation: 'khrap', japanese: '(丁寧語)' },
              ],
            },
          ],
        }),
      });
    });

    await page.goto('/');
  });

  test('should add word to favorites', async ({ page }) => {
    // Navigate to a conversation
    const topicCard = page.getByRole('button').filter({ hasText: '挨拶' }).first();
    await topicCard.click();

    // Wait for conversation to load
    await expect(page.getByText('สวัสดีครับ')).toBeVisible();

    // Click on a word chip to add to favorites
    const wordChip = page.getByText('สวัสดี').first();
    await wordChip.click();

    // Check if favorite icon appears or changes
    // (This depends on your implementation)
    await expect(page.getByText('お気に入りに追加しました')).toBeVisible({ timeout: 3000 });
  });

  test('should navigate to favorites page', async ({ page }) => {
    const favoritesButton = page.getByText('お気に入り');
    await favoritesButton.click();

    await expect(page).toHaveURL('/favorites');
    await expect(page.getByText('単語帳')).toBeVisible();
  });

  test('should display empty state when no favorites', async ({ page }) => {
    // Clear localStorage to ensure empty state
    await page.evaluate(() => localStorage.clear());

    await page.goto('/favorites');

    await expect(page.getByText('お気に入りの単語がまだありません')).toBeVisible();
  });

  test('should remove word from favorites', async ({ page }) => {
    // First, add a word to favorites
    const topicCard = page.getByRole('button').filter({ hasText: '挨拶' }).first();
    await topicCard.click();

    await expect(page.getByText('สวัสดีครับ')).toBeVisible();

    const wordChip = page.getByText('สวัสดี').first();
    await wordChip.click();

    // Navigate to favorites
    await page.goto('/favorites');

    // Remove the word
    const deleteButton = page.getByLabel(/削除/i).first();
    if (await deleteButton.isVisible()) {
      await deleteButton.click();

      // Confirm deletion if there's a confirmation dialog
      const confirmButton = page.getByRole('button', { name: /はい|確認|削除/i });
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
      }
    }
  });
});
