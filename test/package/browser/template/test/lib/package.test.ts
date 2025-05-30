import { test, expect } from '@playwright/test';

test.describe('NPM package', () => {
  for (const scenario of [
    { name: 'default export', path: '/index-default.html' },
    { name: 'Objects plugin export', path: '/index-objects.html' },
    { name: 'modular export', path: '/index-modular.html' },
  ]) {
    test.describe(scenario.name, () => {
      /** @nospec */
      test('can be imported and provides access to Ably functionality', async ({ page }) => {
        const pageResultPromise = new Promise<void>((resolve, reject) => {
          page.exposeFunction('onResult', (error: Error | null) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });

        await page.goto(scenario.path);
        await pageResultPromise;
      });
    });
  }
});
