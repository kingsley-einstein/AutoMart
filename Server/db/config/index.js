import { Pool } from 'pg';
import { environment } from '../../environment';

const {
  connectionString
} = environment;

export const pool = new Pool({
  connectionString,
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
export const runQueries = async (queries) => {
  await queries.forEach(async (query) => {
    await pool
      .query(query)
      .then((res) => {
        console.log(res);
        // pool.end();
      })
      .catch((err) => {
        console.log(err);
        // pool.end();
      });
  });
};
