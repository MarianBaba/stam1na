import dotenv from 'dotenv';

dotenv.config();

const config = {
  url: 'https://automationexercise.com',
  API_BASE_URL: 'https://automationexercise.com/api',
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
};

export default config;
