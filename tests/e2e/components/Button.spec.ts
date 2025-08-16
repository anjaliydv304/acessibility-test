import { test, expect } from '@playwright/test';

test.describe('Button Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default');
    // Wait for the button to be visible on the page before proceeding
    await expect(page.getByRole('button', { name: 'Click me' })).toBeVisible();
  });

  test('should render normal button variant correctly', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click me');
    
    // Visual regression test
    await expect(page).toHaveScreenshot('button-normal.png');
  });

  test('should render glowing button variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--glowing');
    const button = page.getByRole('button', { name: 'Shiny Click' });
    await expect(button).toBeVisible();
    
    // Visual regression test
    await expect(page).toHaveScreenshot('button-glowing.png');
  });

  test('should handle click interactions', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    
    // Test hover state
    await button.hover();
    await expect(page).toHaveScreenshot('button-hover.png');
    
    // Test click
    await button.click();
    
    // Test focus state
    await button.focus();
    await expect(page).toHaveScreenshot('button-focus.png');
  });

  test('should handle disabled state correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled');
    const button = page.getByRole('button');
    
    await expect(button).toBeDisabled();
    await expect(page).toHaveScreenshot('button-disabled.png');
    
    // Ensure click doesn't work
    await button.click({ force: true });
    // Add assertions to verify no action was taken
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    
    // Ensure the button is visible before tabbing
    await expect(button).toBeVisible();
    
    // Tab to button
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    
    // Activate with Space
    await page.keyboard.press('Space');
  });

  test('should work across different viewports', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('button-desktop.png');
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('button-tablet.png');
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('button-mobile.png');
  });

  test('should handle animations correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--animated');
    const button = page.getByRole('button');
    await expect(button).toBeVisible(); // Ensure button is visible before testing
    
    // Test initial state
    await expect(page).toHaveScreenshot('button-animation-initial.png');
    
    // Trigger hover animation
    await button.hover();
    await page.waitForTimeout(500); // Increased wait time
    await expect(page).toHaveScreenshot('button-animation-hover.png');
    
    // Test click animation
    await button.click();
    await page.waitForTimeout(500); // Increased wait time
    await expect(page).toHaveScreenshot('button-animation-clicked.png');
  });

  test('should maintain consistent styling across browsers', async ({ page, browserName }) => {
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
    
    // Browser-specific screenshot
    await expect(page).toHaveScreenshot(`button-${browserName}.png`);
  });
});

test.describe('Button Performance Tests', () => {
  test('should render quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/iframe.html?id=components-button--default');
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(3000); // Should render within 3 seconds
  });

  test('should handle multiple rapid clicks', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default');
    const button = page.getByRole('button', { name: 'Click me' });
    
    // Ensure the button is enabled and visible before clicking
    await expect(button).toBeEnabled();
    await expect(button).toBeVisible();

    // Rapid clicks test
    // Use Promise.all to click all at once and check responsiveness
    await Promise.all(
      Array.from({ length: 10 }, () => button.click())
    );
    
    // Ensure button is still responsive
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });
});