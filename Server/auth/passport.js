import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { usersTable } from '../models';

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
};

passport.use(new Strategy(options, (payload, done) => {
    let user = usersTable.getAllUsers()
    .find((value) => value.email === payload.email);

    if (user) done(null, user)
    else done(new Error("User not found"), false);
}));

export const authObj = {
    passport,
    options
};