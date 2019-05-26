import { json, urlencoded } from 'body-parser';
import router from '../routes';

export default class Config {
  configure(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use('/api/v1', router);
  }
}
