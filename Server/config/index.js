import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import router from '../routes';

export default class Config {
  configure(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.use('/api/v1', router);
  }
}
