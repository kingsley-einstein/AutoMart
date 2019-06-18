import { Pool } from 'pg';
import { environment } from '../../environment';

const {
  database, user, password, port, host
} = environment;

export const pool = new Pool({
  host,
  user,
  database,
  password,
  port,
  max: 10,
  idleTimeoutMillis: 30000
});

pool.on('connect', () => {
  console.log('Connected to db');
});

/**
 *
 * @param {any[]} queries
 */
export const createTables = (queries) => {
  queries.forEach((query) => {
    pool
      .query(query)
      .then((res) => {
        console.log(res);
        // pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  });
};
