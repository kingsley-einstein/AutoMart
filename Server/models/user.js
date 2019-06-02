import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authObj } from '../auth';

const { options } = authObj;

let id = 1;

export const usersTable = {
  users: [
    {
      id,
      email: 'javaprodigy56@gmail.com',
      first_name: 'Kingsley',
      last_name: 'Victor',
      password: hashSync('password', genSaltSync(10)),
      address: '5, Kao Alabi Crescent, Owutu, Agric, Ikorodu, Lagos',
      is_admin: true,
      phone_number: '+2349090456789',
      token: jwt.sign({ email: 'javaprodigy56@gmail.com' }, options.secretOrKey)
    }
  ],
  create(obj) {
    id++;
    const item = obj;
    item.id = id;
    this.users.push(item);

    return item;
  },
  // getByToken(token) {},
  /**
   *
   * @param {number} user_id
   */
  getUserById(user_id) {
    let user = null;
    this.users.forEach((value) => {
      if (value.id == user_id) {
        user = value;
      }
    });

    return user;
  },
  /**
   *
   * @param {string} email
   */
  getUserByEmail(email) {
    let user = null;
    this.users.forEach((value) => {
      if (value.email === email) {
        user = value;
      }
    });

    return user;
  },
  getAllUsers() {
    return this.users;
  },
  /**
   *
   * @param {number} user_id
   * @param {*} ctx
   */
  update(
    user_id,
    {
      email, first_name, last_name, password, address, is_admin, token, phone_number
    }
  ) {
    let user = {};
    this.users.forEach((value) => {
      if (value.id == user_id) {
        user = value;
      }
    });
    user.email = email || user.email;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.password = password || user.password;
    user.address = address || user.address;
    user.is_admin = is_admin || user.is_admin;
    user.token = token || user.token;
    user.phone_number = phone_number || user.phone_number;

    this.users.forEach((value, index) => {
      if (value.id === user.id) {
        this.users.splice(index, 1, user);
      }
    });

    return user;
  },
  delete(user_id) {
    if (!user_id) this.users.shift();
    else {
      this.users.forEach((value, index) => {
        if (value.id === id) {
          this.users.splice(index, 1);
        }
      });
    }
    return 'User deleted';
  }
};
