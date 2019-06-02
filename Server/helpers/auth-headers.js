import { usersTable } from '../models';

export class TokenExtractor {
  async extractTokenFromHeader(req, res, next) {
    const { authorization } = req.headers;
    const user = await usersTable.users.find(value => value.token === authorization.split(' ')[1]);
    req.user = user;
    next();
  }
}
