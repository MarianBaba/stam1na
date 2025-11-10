import axios from 'axios';

interface SaveUserInput {
  email: string;
  password: string;
}

export async function saveUser({ email, password }: SaveUserInput): Promise<void> {
  const mutation = `
    mutation SaveRegisteredUser($email: String!, $password: String!) {
      saveUser(email: $email, password: $password) {
        id
        email
        password
      }
    }
  `;

  try {
    const response = await axios.post(
      'http://localhost:4000/graphql',
      {
        query: mutation,
        variables: { email, password },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourToken}`,
        },
      }
    );

    const { data } = response;

    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      throw new Error(`GraphQL mutation failed: ${data.errors[0]?.message || 'Unknown error'}`);
    }

    console.log('✅ User saved:', data.data.saveUser);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Axios error:', error.response?.data || error.message);
    } else {
      console.error('❌ Unexpected error:', error);
    }
    throw error;
  }
}
