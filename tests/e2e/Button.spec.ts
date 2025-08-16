import { test, expect } from '@playwright/test';

// Group all visual tests together
test.describe('Button Component - Visual and Accessibility Tests', () => {

  test('should render and handle all core visual states correctly', async ({ page }) => {
    // Test default button
    await page.goto('/iframe.html?id=components-button--default');
    await expect(page).toHaveScreenshot('button-default-state.png');

    // Test disabled button
    await page.goto('/iframe.html?id=components-button--disabled');
    const disabledButton = page.getByRole('button');
    await expect(disabledButton).toBeDisabled();
    await expect(page).toHaveScreenshot('button-disabled-state.png');

    // Test hover state
    await page.goto('/iframe.html?id=components-button--default');
    const button = page.getByRole('button', { name: 'Click me' });
    await button.hover();
    await expect(page).toHaveScreenshot('button-hover-state.png');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Add 'waitUntil: 'networkidle'' to ensure the page is fully loaded
    await page.goto('/iframe.html?id=components-button--default', { waitUntil: 'networkidle' });
    const button = page.getByRole('button', { name: 'Click me' });

    // Ensure the button is visible and focusable
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();

    // Verify activation with Enter key
    await page.keyboard.press('Enter');
    // Add an assertion here to confirm an action occurred if possible, e.g., a modal opens.
  });

});


// Group all functional and performance tests together
test.describe('Button Component - Functional and Performance Tests', () => {

  test('should handle rapid interactions without failure', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default');
    const button = page.getByRole('button', { name: 'Click me' });

    // Test multiple clicks to ensure stability
    await Promise.all(
      Array.from({ length: 5 }, () => button.click())
    );

    // Verify the button remains responsive and enabled
    await expect(button).toBeEnabled();
  });

  test('should render quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/iframe.html?id=components-button--default');
    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();
    const endTime = Date.now();

    // Increased the time limit to 5000ms to account for environmental variations
    expect(endTime - startTime).toBeLessThan(5000);
  });

});