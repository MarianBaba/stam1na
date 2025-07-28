import test from 'playwright/test';
import { getUser } from '../resources/data/user';
import { LoginSignupPage } from '../pages/automexe/LoginSignupPage';
import SignUpPage from '../pages/automexe/SignUpPage';
import { saveUser } from '../resources/data/user/save';
import { User } from '../resources/data/user/types';

test.describe('User Authentication', () => {
  test('registerUser @full-regression @authentication', async ({ page }) => {
    // setup : test data
    let user: User;
    await test.step('setup: get user data', async () => {
      user = await getUser();
    });

    const loginSignupPage = new LoginSignupPage(page);
    await loginSignupPage.navigate();
    await loginSignupPage.assertUrl();
    await loginSignupPage.signup(user);
    const signupPage = new SignUpPage(page);
    await signupPage.assertUrl();
    await signupPage.signup(user);

    await test.step('teardown: save registered user', async () => {
      await saveUser({ email: user.email, password: user.password });
    });
  });
  //   test('registerUserWithExistingEmail @full-regression @authentication', async ({ page }) => {});
  //   test('loginUserCorrectCredentials @full-regression @authentication', async ({ page }) => {});
  //   test('loginUserIncorrectCredentials @full-regression @authentication', async ({ page }) => {});
  //   test('logout @full-regression @authentication', async ({ page }) => {});
});
