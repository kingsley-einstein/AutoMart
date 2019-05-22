import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '/.env')
});

export const environment = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
};
