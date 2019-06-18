import jwt from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
// import { usersTable } from '../models';
import { authObj } from '../auth';
import { checkDuplicates, checkIfKeysArePresent, showMissingKeysError } from '../helpers';
import { pool } from '../db/config';

const { options } = authObj;

export class UserController {
  async create(req, res) {
    try {
      const { body } = req;
      if (!checkIfKeysArePresent(body, ['email', 'password', 'first_name', 'last_name'])) {
        showMissingKeysError(body, ['email', 'password', 'first_name', 'last_name'], res);
      } else {
        body.token = jwt.sign({ email: body.email }, options.secretOrKey);
        body.password = hashSync(body.password, genSaltSync(10));
        if (checkDuplicates.userAlreadyExists(body)) {
          res.status(400).json({
            status: 400,
            error: 'User with email already exists'
          });
        } else {
          await pool
            .query(
              'INSERT INTO users(first_name, last_name, email, password, token, address) values($1, $2, $3, $4, $5, $6") returning *',
              [body.first_name, body.last_name, body.email, body.password, body.token, body.address]
            )
            .then((data) => {
              res.status(201).json({
                status: 201,
                data: data.rows[0]
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                error: err.message
              });
            });
        }
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM users WHERE email = $1', [email])
          .then((data) => {
            const { rows } = data;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      if (!user) {
        res.status(404).json({
          status: 404,
          error: 'User not found'
        });
      } else if (compareSync(password, user.password)) {
        res.status(200).json({
          status: 200,
          data: user
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'Incorrect password'
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM users')
          .then((data) => {
            const { rows } = data;
            resolve(rows);
          })
          .catch(err => reject(err));
      });

      res.status(200).json({
        status: 200,
        data: users
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM users WHERE id = $1', [user_id])
          .then((data) => {
            const { rows } = data;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });

      res.status(200).json({
        status: 200,
        data: user
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getUserByToken(req, res) {
    try {
      const { user } = req;
      if (!user) {
        res.status(401).json({
          status: 401,
          error: 'Unauthorized'
        });
      } else {
        res.status(200).json({
          status: 200,
          data: user
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}
