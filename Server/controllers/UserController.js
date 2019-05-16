import { usersTable } from '../models';
import jwt from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync} from 'bcryptjs';
import { authObj } from '../auth/passport';

const { options } = authObj;

export class UserController {
    async create(req, res) {
        let body = req.body;
        body.token = jwt.sign({email: body.email}, options.secretOrKey);
        body.password = hashSync(body.password, genSaltSync(10));
        let user = await usersTable.create(body);
        res.status(200).json({
            status: 200,
            data: user
        });
    }

    async login(req, res) {
        let { email, password } = req.body;
        let user = await usersTable.getUserByEmail(email);
        if (!user)
            res.status(404).json({
                status: 404,
                message: "User not found"
            })
        else {
            if (compareSync(password, user.password))
                res.status(200).json({
                    status: 200,
                    data: user
                })
            else res.status(500).json({
                status: 500,
                message: "Incorrect password"
            });
        }
    }
}