import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import router from '../routes';
import { authObj } from '../auth/passport';

const { passport } = authObj;

export default class Config {
  configure(app) {
    app.use(passport.initialize());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.use('/api/v1', router);
  }
}
