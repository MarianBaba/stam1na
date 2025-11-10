import test from 'playwright/test';
import { getUser } from '../resources/data/types/user';
import { LoginSignupPage } from '../pages/automexe/LoginSignupPage';
import SignUpPage from '../pages/automexe/SignUpPage';
import { saveUser } from '../resources/data/types/user/save';
import { User } from '../resources/data/types/user/types';

test.describe('User Authentication', () => {
  test('registerUser @full-regression @authentication', async ({ page }) => {
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
});
