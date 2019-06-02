import jwt from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { usersTable } from '../models';
import { authObj } from '../auth';
import { checkDuplicates, checkIfKeysArePresent, showMissingKeysError } from '../helpers';

const { options } = authObj;

export class UserController {
  async create(req, res) {
    try {
      const { body } = req;
      if (!checkIfKeysArePresent(body, ['email', 'password'])) showMissingKeysError(body, ['email', 'password'], res);
      else {
        body.token = jwt.sign({ email: body.email }, options.secretOrKey);
        body.password = hashSync(body.password, genSaltSync(10));
        if (checkDuplicates.userAlreadyExists(body)) {
          res.status(400).json({
            status: 400,
            error: 'User with email already exists'
          });
        } else {
          const user = await usersTable.create(body);
          res.status(200).json({
            status: 200,
            data: user
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
      const user = await usersTable.getUserByEmail(email);
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
      const users = await usersTable.getAllUsers();

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
      const user = await usersTable.getUserById(user_id);

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
