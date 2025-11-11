import { APIRequestContext } from '@playwright/test';
import { step } from '@decorators/step';
import { BaseApi } from '@resources/api/base/BaseApi';
import {
  UserCreateResponse,
  UserDeleteResponse,
  UserGetDetailResponse,
  UserUpdateResponse,
  VerifyLoginResponse,
} from '@resources/data/types/user/UserApiResponse';
import { User } from '@resources/data/types/user/User';

export class UsersApi extends BaseApi {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  @step()
  async createNewUser(user?: User): Promise<UserCreateResponse> {
    const params = new URLSearchParams();

    if (user) {
      if (user.title) params.append('title', String(user.title));
      if (user.firstName) params.append('firstname', user.firstName);
      if (user.lastName) params.append('lastname', user.lastName);
      if (user.firstName || user.lastName) {
        const name = `${user.firstName ?? ''}${user.lastName ? ' ' + user.lastName : ''}`.trim();
        if (name) params.set('name', name);
      }
      if (user.email) params.append('email', user.email);
      if (user.password) params.append('password', user.password);
      if (user.birthDay) params.append('birth_date', user.birthDay);
      if (user.birthMonth) params.append('birth_month', user.birthMonth);
      if (user.birthYear) params.append('birth_year', user.birthYear);
      if (user.company) params.append('company', user.company);
      if (user.address1) params.append('address1', user.address1);
      if (user.address2) params.append('address2', user.address2);
      if (user.country) params.append('country', user.country);
      if (user.zipcode) params.append('zipcode', user.zipcode);
      if (user.state) params.append('state', user.state);
      if (user.city) params.append('city', user.city);
      if (user.mobileNumber) params.append('mobile_number', user.mobileNumber);
    }

    const resp = await this.post<UserCreateResponse>('/createAccount', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return resp as UserCreateResponse;
  }

  @step()
  async deleteAccount(user: { email: string; password: string }): Promise<UserDeleteResponse> {
    const params = new URLSearchParams();
    params.append('email', user.email);
    params.append('password', user.password);

    const resp = await this.delete<UserDeleteResponse>('/deleteAccount', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return resp as UserDeleteResponse;
  }

  @step()
  async updateAccount(user: User): Promise<UserUpdateResponse> {
    const params = new URLSearchParams();
    params.append('title', user.title);
    params.append('firstname', user.firstName);
    params.append('lastname', user.lastName);
    params.append('name', `${user.firstName} ${user.lastName}`);
    params.append('email', user.email);
    params.append('password', user.password);
    params.append('birth_date', user.birthDay);
    params.append('birth_month', user.birthMonth);
    params.append('birth_year', user.birthYear);
    params.append('company', user.company);
    params.append('address1', user.address1);
    params.append('address2', user.address2);
    params.append('country', user.country);
    params.append('state', user.state);
    params.append('city', user.city);
    params.append('zipcode', user.zipcode);
    params.append('mobile_number', user.mobileNumber);

    const resp = await this.put<UserUpdateResponse>('/updateAccount', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return resp as unknown as UserUpdateResponse;
  }

  @step()
  async getUserByEmail(email: string): Promise<UserGetDetailResponse> {
    const resp = await this.get<UserGetDetailResponse>(
      `/getUserDetailByEmail?email=${encodeURIComponent(email)}`
    );
    return resp;
  }

  @step()
  async verifyLogin(password: string, email?: string) {
    const params = new URLSearchParams();
    if (email) {
      params.append('email', email);
    }
    params.append('password', password);

    return await this.post<VerifyLoginResponse>('/verifyLogin', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  @step()
  async verifyLoginWithDeleteMethod() {
    const params = new URLSearchParams();

    return await this.delete<VerifyLoginResponse>('/verifyLogin', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
