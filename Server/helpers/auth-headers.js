// import { usersTable } from '../models';
import { pool } from '../db/config';

export class TokenExtractor {
  async extractTokenFromHeader(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        status: 401,
        error: 'Auth header is null'
      });
      return;
    }
    const user = await new Promise((resolve, reject) => {
      pool
        .query('SELECT * FROM users WHERE token = $1', [authorization])
        .then((data) => {
          const { rows } = data;
          resolve(rows[0]);
          console.log(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
    if (user) {
      // console.log(user);
      req.user = user;
      next();
    } else {
      console.log(user);
      res.status(401).json({
        status: 401,
        error: 'You are not allowed to access this resource'
      });
    }
  }
}
