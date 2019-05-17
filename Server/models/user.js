let id = 0;

export const usersTable = {
  users: [],
  create(obj) {
    id++;
    const item = obj;
    item.id = id;
    this.users.push(item);

    return item;
  },
  // getByToken(token) {},
  getUserById(user_id) {
    let user = null;
    this.users.forEach((value) => {
      if (value.id === user_id) {
        user = value;
      }
    });

    return user;
  },
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
  update(user_id, {
    email, first_name, last_name, password, address, is_admin, token,
  }) {
    let user = {};
    this.users.forEach((value) => {
      if (value.id === user_id) {
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
    return true;
  },
};
