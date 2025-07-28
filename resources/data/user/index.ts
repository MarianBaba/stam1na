import { createUser } from './create';
import { User } from './types';

export async function getUser(): Promise<User> {
  return await createUser();
}
