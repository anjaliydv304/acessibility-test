import { test, expect } from '@playwright/test';

test('Button visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=button--primary'); // Storybook story
  expect(await page.screenshot()).toMatchSnapshot('button-primary.png');
});
