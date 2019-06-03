import path from 'path';

export const useStatics = (app, express) => {
  app.use(express.static(path.join(__dirname, '../../UI/static')));
};

export const serveFiles = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../UI/index.html'));
  });
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../UI/views/dashboard.html'));
  });
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../UI/views/signup.html'));
  });
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../UI/views/signin.html'));
  });
};
