import express from 'express';
import Config from './config';
import { runQueries } from './db/config';
// import { environment } from './environment';

const app = express();
const port = process.env.PORT || 4000;
const config = new Config();
config.configure(app);

const create = [
  'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name VARCHAR (50) NOT NULL, last_name VARCHAR (50) NOT NULL, password VARCHAR (80) NOT NULL, address VARCHAR (250) NOT NULL, is_admin boolean NOT NULL, email VARCHAR (250) NOT NULL, token VARCHAR (250) NOT NULL)',
  'CREATE TABLE IF NOT EXISTS cars(id SERIAL PRIMARY KEY, created_on TIMESTAMP NOT NULL, state VARCHAR (20) NOT NULL, price FLOAT NOT NULL, manufacturer VARCHAR (20) NOT NULL, model VARCHAR (20) NOT NULL, body_type VARCHAR (20) NOT NULL, img_url VARCHAR (20) NOT NULL)',
  'CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, amount FLOAT NOT NULL, status VARCHAR (20) NOT NULL)',
  'CREATE TABLE IF NOT EXISTS flags(id SERIAL PRIMARY KEY, created_on TIMESTAMP NOT NULL, reason VARCHAR (255), description VARCHAR (255))'
];

const alter = [
  'ALTER TABLE cars ADD COLUMN owner INTEGER REFERENCES users(id) NOT NULL',
  'ALTER TABLE orders ADD COLUMN car_id INTEGER REFERENCES cars(id) NOT NULL',
  'ALTER TABLE orders ADD COLUMN  buyer INTEGER REFERENCES users(id)',
  'ALTER TABLE orders ADD COLUMN seller INTEGER REFERENCES users(id)',
  'ALTER TABLE flags ADD COLUMN car_id INTEGER REFERENCES cars(id) NOT NULL'
];

app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
  runQueries(create);
  runQueries(alter);
});

export default app;
