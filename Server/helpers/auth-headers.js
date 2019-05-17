import { usersTable } from '../models';

export class TokenExtractor {
   async extractTokenFromHeader(req, res, next) {
        let auth = req.headers.authorization;
        await usersTable.getAllUsers().forEach(value => {
            if (value.token === auth.split(" ")[1]) {
                req.user = value;
                next();
            }
        });
    }
}