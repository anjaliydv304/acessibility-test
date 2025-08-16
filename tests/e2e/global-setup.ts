// tests/e2e/global-setup.ts
import { chromium} from '@playwright/test';

async function globalSetup() {
  console.log('🚀 Setting up global test environment...');
  
  // Launch browser to warm up and check if storybook is ready
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Wait for storybook to be ready
    console.log('⏳ Waiting for Storybook to be ready...');
    await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
    
    // Check if storybook loaded successfully
    const storybookRoot = await page.locator('#storybook-root, #root, .sb-show-main').first();
    await storybookRoot.waitFor({ state: 'attached', timeout: 30000 });
    
    console.log('✅ Storybook is ready');
    
    // Pre-warm the button stories to cache them
    const stories = [
      '/iframe.html?id=components-button--default',
      '/iframe.html?id=components-button--glowing',
    ];
    
    for (const story of stories) {
      try {
        console.log(`🔄 Pre-warming story: ${story}`);
        await page.goto(story, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
      } catch (error: unknown) {
        console.log(`⚠️  Could not pre-warm ${story}:`, error instanceof Error ? error.message : String(error));
      }
    }
    
  } catch (error: unknown) {
    console.error('❌ Global setup failed:', error instanceof Error ? error.message : String(error));
    throw error;
  } finally {
    await browser.close();
  }
  
  console.log('✅ Global setup completed');
}

export default globalSetup;