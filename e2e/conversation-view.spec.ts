import { test, expect } from '@playwright/test';

test.describe('Conversation View', () => {
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
            {
              speaker: 'B',
              thai: 'สบายดีไหม',
              pronunciation: 'sa-baai-dee mai',
              japanese: '元気ですか',
              words: [
                { thai: 'สบายดี', pronunciation: 'sa-baai-dee', japanese: '元気' },
                { thai: 'ไหม', pronunciation: 'mai', japanese: 'か' },
              ],
              grammarPoint: {
                title: '疑問文の作り方',
                explanation: 'ไหม を文末に付けると疑問文になります',
                examples: [
                  {
                    thai: 'ชอบไหม',
                    pronunciation: 'chop mai',
                    japanese: '好きですか',
                  },
                ],
              },
            },
          ],
        }),
      });
    });

    await page.goto('/');
    const topicCard = page.getByRole('button').filter({ hasText: '挨拶' }).first();
    await topicCard.click();
  });

  test('should display conversation content', async ({ page }) => {
    await expect(page.getByText('สวัสดีครับ')).toBeVisible();
    await expect(page.getByText('sa-wat-dee khrap')).toBeVisible();
    await expect(page.getByText('こんにちは')).toBeVisible();
  });

  test('should display all conversation lines', async ({ page }) => {
    await expect(page.getByText('สวัสดีครับ')).toBeVisible();
    await expect(page.getByText('สบายดีไหม')).toBeVisible();
  });

  test('should toggle listening mode', async ({ page }) => {
    const listeningToggle = page.getByRole('button', { name: /リスニングモード/i });

    // Japanese translations should be visible by default
    await expect(page.getByText('こんにちは')).toBeVisible();

    // Toggle listening mode
    await listeningToggle.click();

    // Japanese should be hidden, need to click to show
    await expect(page.getByText('訳を表示').first()).toBeVisible();
  });

  test('should show translation in listening mode when clicked', async ({ page }) => {
    const listeningToggle = page.getByRole('button', { name: /リスニングモード/i });
    await listeningToggle.click();

    // Click "訳を表示"
    await page.getByText('訳を表示').first().click();

    // Japanese translation should appear
    await expect(page.getByText('こんにちは')).toBeVisible();
    await expect(page.getByText('訳を隠す')).toBeVisible();
  });

  test('should show grammar modal when grammar button is clicked', async ({ page }) => {
    // Wait for content to load
    await expect(page.getByText('สบายดีไหม')).toBeVisible();

    // Click grammar button (lightbulb icon)
    const grammarButton = page.getByLabel('文法解説を見る');
    await grammarButton.click();

    // Modal should appear
    await expect(page.getByText('疑問文の作り方')).toBeVisible();
    await expect(page.getByText('ไหม を文末に付けると疑問文になります')).toBeVisible();
  });

  test('should navigate to roleplay mode', async ({ page }) => {
    const roleplayButton = page.getByRole('button', { name: /ロールプレイモード/i });
    await roleplayButton.click();

    await expect(page).toHaveURL(/\/roleplay\//);
  });

  test('should navigate back to topic selection', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /戻る/i });
    await backButton.click();

    await expect(page).toHaveURL('/');
  });
});
