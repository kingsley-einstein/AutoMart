import { usersTable } from '../models';

export const checkDuplicates = {
  userAlreadyExists: user => usersTable.getAllUsers().some(value => value.email === user.email)
};
