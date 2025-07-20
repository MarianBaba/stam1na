import test from 'playwright/test';
import SignUpPage from '../pages/automexe/SignUpPage';

test.describe('Functionality Related to User Authentication', () => {
  test('registerUser @full-regression @authentication', async ({ page }) => {
    const signUpPage = await SignUpPage.openInNewTab(page);
    await signUpPage.assertUrl();
    await signUpPage.fillSignupNameInput("marian1");
    await signUpPage.fillSignupPasswordInput("marian");
    await signUpPage.submitFirstSignupForm();
  });
//   test('registerUserWithExistingEmail @full-regression @authentication', async ({ page }) => {});
//   test('loginUserCorrectCredentials @full-regression @authentication', async ({ page }) => {});
//   test('loginUserIncorrectCredentials @full-regression @authentication', async ({ page }) => {});
//   test('logout @full-regression @authentication', async ({ page }) => {});
});
