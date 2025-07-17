import { test, expect } from '@playwright/test';
import HomePage from '../pages/automexe/HomePage';

test.describe('Home Page', () => {
  test('should navigate to login page @login @smoke', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto('https://automationexercise.com');
    await homePage.goToLoginPage();

    await expect(page).toHaveURL('https://automationexercise.com');
  });
});
