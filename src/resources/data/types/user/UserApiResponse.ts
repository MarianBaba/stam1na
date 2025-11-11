import { User } from '@resources/data/types/user/User';

export type UserCreateResponse = {
  responseCode: number;
  message: string;
};

export type UserDeleteResponse = {
  responseCode: number;
  message: string;
};

export type UserUpdateResponse = {
  responseCode: number;
  message: string;
};

export type UserGetDetailResponse = {
  responseCode: number;
  user: User;
};

export type VerifyLoginResponse = {
  responseCode: number;
  message: string;
};
