import { json, urlencoded } from 'body-parser';
// import logger from 'morgan';
import router from '../routes';
// import { preventIdle } from '../helpers';
// import { authObj } from '../auth/passport';

// const { passport } = authObj;

export default class Config {
  configure(app) {
    // app.use(passport.initialize());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // res.status(200).send();
      next();
    });
    // app.options('*', (req, res, next) => {});
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // app.use(logger('dev'));
    app.use('/api/v1', router);
    // preventIdle();
  }
}
