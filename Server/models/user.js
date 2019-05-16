let id = 0;

export const usersTable = {
	users: [],
	create: function(obj) {
		id++;
		obj.id = id;
		this.users.push(obj);

		return obj;
	},
	getByToken: function(token) {

	},
	getUserById: function(id) {
		let user = {};
		this.users.forEach(value => {
			if (value.id === id) {
				user = value;
			}
		});

		return user;
	},
	getAllUsers: function() {
		return this.users;
	},
	update: function(id, { email, first_name, last_name, password, address, is_admin}) {
		let user = {};
		this.users.forEach(value => {
			if (value.id === id) {
				user = value;
			}
		});
		user.email = email ? email : user.email;
		user.first_name = first_name ? first_name : user.first_name;
		user.last_name = last_name ? last_name : user.last_name;
		user.password = password ? password : user.password;
		user.address = address ? address : user.address;
		user.is_admin = is_admin !== null ? is_admin : user.is_admin;

		this.users.forEach(value => {
			if (value.id === user.id) {
				this.users.splice(this.users.indexOf(value), 1, user);
			}
		});

		return user;
	},
	delete: function(id) {
		if (!id) this.users.shift()
		else this.users.forEach(value => {
			if (value.id === id) {
				this.users.splice(this.users.indexOf(value), 1);
			}
		});
		return true;
	}
};