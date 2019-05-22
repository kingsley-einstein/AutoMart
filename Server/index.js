import express from 'express';
import Config from './config';
// import { environment } from './environment';

const app = express();
const port = process.env.PORT || 4000;
const config = new Config();
config.configure(app);

app.listen(port, () => console.log(`Express server started on port: ${port}`));
