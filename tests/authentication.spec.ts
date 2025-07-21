import test from 'playwright/test';
import { getUser } from '../resources/data/user';
import { LoginSignupPage } from '../pages/automexe/LoginSignupPage';
import SignUpPage from '../pages/automexe/SignUpPage';

test.describe('User Authentication', () => {
  test('registerUser @full-regression @authentication', async ({ page }) => {
    // setup : test data
    const user = await getUser();

    const loginSignupPage = new LoginSignupPage(page);
    await loginSignupPage.navigate();
    await loginSignupPage.assertUrl();
    await loginSignupPage.signup(user);
    const signupPage = new SignUpPage(page);
    await signupPage.assertUrl();
    await signupPage.signup(user);
  });
  //   test('registerUserWithExistingEmail @full-regression @authentication', async ({ page }) => {});
  //   test('loginUserCorrectCredentials @full-regression @authentication', async ({ page }) => {});
  //   test('loginUserIncorrectCredentials @full-regression @authentication', async ({ page }) => {});
  //   test('logout @full-regression @authentication', async ({ page }) => {});
});
