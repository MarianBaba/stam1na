import { test } from '@playwright/test';
import HomePage from '../pages/automexe/HomePage';

test.describe('Home Page', () => {
  test('should navigate to login page @login @smoke', async ({ page }) => {
    const homePage = await HomePage.openInNewTab(page);
    await homePage.acceptPrivacyIfVisible();
  });
});
