import { expect, test } from '@playwright/test';
import { UsersApi } from '@resources/api/UsersApi';
import { UserFactory } from '@resources/data/factories/UserFactory';
import { description } from 'allure-js-commons';
import {
  UserCreateResponse,
  UserDeleteResponse,
  UserGetDetailResponse,
  UserUpdateResponse,
  VerifyLoginResponse,
} from '@resources/data/types/user/UserApiResponse';

test.describe('User Management API', () => {
  test('createNewUser @smoke @no-regression @api @user', async ({ request }) => {
    await description(
      'Verifies that a new user can be successfully created and handles duplicate user creation attempts gracefully.'
    );

    const usersApi = new UsersApi(request);
    const user = UserFactory.create();

    const createResp: UserCreateResponse = await usersApi.createNewUser(user);
    expect(createResp).toBeTruthy();
    expect(createResp.responseCode).toBe(201);
    expect(createResp.message).toBe('User created!');

    const duplicateResp: UserCreateResponse = await usersApi.createNewUser(user);

    expect(duplicateResp).toBeTruthy();
    expect([400, 409]).toContain(duplicateResp.responseCode);
    expect(
      typeof duplicateResp.message === 'string' &&
        (duplicateResp.message.includes('Email already exists') ||
          duplicateResp.message.toLowerCase().includes('already exists') ||
          duplicateResp.responseCode !== 201)
    ).toBeTruthy();
  });

  test('deleteUser @smoke @no-regression @api @user @delete', async ({ request }) => {
    await description(
      'Validates that an existing user can be deleted using their email and password.'
    );

    const usersApi = new UsersApi(request);
    const user = UserFactory.create();

    const createResp: UserCreateResponse = await usersApi.createNewUser(user);
    expect(createResp.responseCode).toBe(201);
    expect(createResp.message).toContain('User created');

    const deleteResp: UserDeleteResponse = await usersApi.deleteAccount({
      email: user.email,
      password: user.password,
    });

    expect(deleteResp.responseCode).toBe(200);
    expect(deleteResp.message).toBe('Account deleted!');
  });

  test('updateUser @smoke @no-regression @api @user @update', async ({ request }) => {
    await description(
      'Ensures that a users details can be successfully updated and verified by fetching the updated record.'
    );

    const usersApi = new UsersApi(request);
    const user = UserFactory.create();

    const createResp: UserCreateResponse = await usersApi.createNewUser(user);
    expect(createResp.responseCode).toBe(201);
    expect(createResp.message).toContain('User created');

    const updatedUser = {
      ...user,
      firstName: 'UpdatedFirst',
      lastName: 'UpdatedLast',
      name: 'UpdatedFirst UpdatedLast', // update full name as well
    };

    const updateResp: UserUpdateResponse = await usersApi.updateAccount(updatedUser);
    expect(updateResp.responseCode).toBe(200);
    expect(updateResp.message).toBe('User updated!');

    const fetchedUserResp = await usersApi.getUserByEmail(updatedUser.email);
    expect(fetchedUserResp.responseCode).toBe(200);

    const fetchedUser = fetchedUserResp.user;
    expect(fetchedUser.name).toContain(updatedUser.firstName);
    expect(fetchedUser.name).toContain(updatedUser.lastName);
  });

  test('getUserDetailsByEmail @smoke @no-regression @api @user @get', async ({ request }) => {
    await description(
      'Checks that a user’s details can be retrieved using their email address and that the data matches the created record.'
    );

    const usersApi = new UsersApi(request);
    const user = UserFactory.create();

    const createResp: UserCreateResponse = await usersApi.createNewUser(user);
    expect(createResp.responseCode).toBe(201);
    expect(createResp.message).toContain('User created');

    const detailResp: UserGetDetailResponse = await usersApi.getUserByEmail(user.email);
    expect(detailResp.responseCode).toBe(200);

    const fetchedUser = detailResp.user;
    expect(fetchedUser.email).toBe(user.email);
    expect(fetchedUser.id).toBeDefined();
    expect(fetchedUser.company).toBeTruthy();
    expect(fetchedUser.name).toContain(user.firstName);
    expect(fetchedUser.name).toContain(user.lastName);
  });

  test('verifyLoginInvalid @smoke @no-regression @api @user @get @negative', async ({
    request,
  }) => {
    await description(
      'Verifies that attempting to log in with invalid credentials returns a “User not found” error.'
    );

    const usersApi = new UsersApi(request);

    const email = 'nonexistent@example.com';
    const password = 'wrongpassword';

    const response: VerifyLoginResponse = await usersApi.verifyLogin(email, password);
    expect(response.responseCode).toBe(404);
    expect(response.message).toContain('User not found');
  });

  test('verifyLoginDeleteMethodNotAllowed @api @negative @user', async ({ request }) => {
    await description(
      'Ensures that sending a DELETE request to the login endpoint returns a 405 Method Not Allowed response.'
    );

    const usersApi = new UsersApi(request);

    const resp: VerifyLoginResponse = await usersApi.verifyLoginWithDeleteMethod();
    expect(resp.responseCode).toBe(405);
    expect(resp.message).toContain('This request method is not supported.');
  });

  test('verifyLoginWithoutEmail @api @negative @user', async ({ request }) => {
    await description(
      'Validates that omitting the email parameter in the login request returns a 400 Bad Request error.'
    );

    const usersApi = new UsersApi(request);
    const password = 'somepassword';

    const response: VerifyLoginResponse = await usersApi.verifyLogin(password);
    expect(response.responseCode).toBe(400);
    expect(response.message).toContain('Bad request, email or password parameter is missing');
  });

  test('verifyLoginWithValidDetails @smoke @no-regression @api @user @post', async ({
    request,
  }) => {
    await description(
      'Confirms that a valid user can successfully log in using correct credentials.'
    );

    const usersApi = new UsersApi(request);

    const user = UserFactory.create();
    const createResp = await usersApi.createNewUser(user);
    expect(createResp.responseCode).toBe(201);
    expect(createResp.message).toContain('User created');

    const loginResp: VerifyLoginResponse = await usersApi.verifyLogin(user.password, user.email);
    expect(loginResp.responseCode).toBe(200);
    expect(loginResp.message).toContain('User exists!');
  });
});
