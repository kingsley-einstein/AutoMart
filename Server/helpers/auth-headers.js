import { usersTable } from '../models';

export class TokenExtractor {
    extractTokenFromHeader = (req, res, next) => {
        let auth = req.headers.authorization;
        usersTable.getAllUsers().forEach(value => {
            if (value.token === auth.split(" ")[1]) {
                req.user = value;
                next();
            }
        });
    }
}