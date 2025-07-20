import dotenv from 'dotenv';

dotenv.config();

const config = {
  url: 'https://automationexercise.com',
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT
};

export default config;
