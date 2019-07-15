import express from 'express';
import Config from './config';
import { runQueries } from './db/config';
// import { environment } from './environment';

const app = express();
const port = process.env.PORT || 4000;
const config = new Config();
config.configure(app);

const create = [
  'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name VARCHAR (50), last_name VARCHAR (50), password VARCHAR (80) NOT NULL, address VARCHAR (250) NOT NULL, is_admin boolean, email VARCHAR (250), token VARCHAR (250))',
  'CREATE TABLE IF NOT EXISTS cars(id SERIAL PRIMARY KEY, created_on TIMESTAMP, state VARCHAR (20), price FLOAT, manufacturer VARCHAR (20), model VARCHAR (20), body_type VARCHAR (20), img_url VARCHAR (20), status VARCHAR (20))',
  'CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, amount FLOAT, status VARCHAR (20))',
  'CREATE TABLE IF NOT EXISTS flags(id SERIAL PRIMARY KEY, created_on TIMESTAMP, reason VARCHAR (255), description VARCHAR (255))'
];

const alter = [
  'ALTER TABLE cars ADD COLUMN owner INTEGER REFERENCES users(id)',
  'ALTER TABLE orders ADD COLUMN car_id INTEGER REFERENCES cars(id)',
  'ALTER TABLE orders ADD COLUMN  buyer INTEGER REFERENCES users(id)',
  'ALTER TABLE orders ADD COLUMN seller INTEGER REFERENCES users(id)',
  'ALTER TABLE flags ADD COLUMN car_id INTEGER REFERENCES cars(id)'
];

app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
  runQueries(create);
  runQueries(alter);
});

export default app;
