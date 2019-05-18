import { json } from 'body-parser';
import router from '../routes';

export default class Config {
  configure(app) {
    app.use(json());
    app.use('/api/v1', router);
  }
}
