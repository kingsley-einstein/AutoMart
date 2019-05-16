import router from '../routes';
import { json } from 'body-parser';

export class Config {
    set(app) {
        app.use(json());
        app.use("/api/v1", router);
    }
}