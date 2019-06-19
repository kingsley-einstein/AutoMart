// import { usersTable } from '../models';
import { pool } from '../db/config';

export const checkDuplicates = {
  userAlreadyExists: user => new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM users WHERE email = $1', [user.email])
      .then((data) => {
        const { rows } = data;
        const result = rows[0];
        console.log(data);
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  })
};
