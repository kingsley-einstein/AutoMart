import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '/.env')
});

export const environment = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secretOrKey: process.env.JWT_SECRET,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
  host: process.env.DB_HOST
};
