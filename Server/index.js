import express from 'express';
import Config from './config';
// import { useStatics, serveFiles } from './render';
// import { environment } from './environment';

const app = express();
const port = process.env.PORT || 4000;
const config = new Config();
config.configure(app);
config.serveUI(app, express);
// useStatics(app, express);
// serveFiles(app);

app.listen(port, () => console.log(`Express server started on port: ${port}`));

export default app;
