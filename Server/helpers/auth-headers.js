// import { usersTable } from '../models';
import { pool } from '../db/config';

export class TokenExtractor {
  async extractTokenFromHeader(req, res, next) {
    const { authorization } = req.headers;
    const user = await new Promise((resolve, reject) => {
      pool
        .query('SELECT * FROM users WHERE token = $1', [authorization.split(' ')[0]])
        .then((data) => {
          const { rows } = data;
          resolve(rows[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'You are not allowed to access this resource'
      });
    }
  }
}
