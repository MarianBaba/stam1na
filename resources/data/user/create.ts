import config from '../../../config';
import { User } from './types';
import axios from 'axios';

const GRAPHQL_URL = config.GRAPHQL_ENDPOINT;

if (!GRAPHQL_URL) {
  throw new Error('GRAPHQL ENDPOINT not defined 🔴');
}

export async function createUser(): Promise<User> {
  const query = `
    mutation {
        createUser {
          id
          title
          firstName
          familyName
          email
          password
          birthDay
          company
          address
          country
          state
          city
          zipcode
          mobileNumber
        }
      }
  `;

  try {
    const response = await axios.post(
      GRAPHQL_URL,
      {
        query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { data, errors } = response.data;

    if (errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(errors)} 🔴`);
    }
    return data.createUser;
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message} 🔴`);
  }
}
