import http from 'http';

export const preventIdle = () => {
  setInterval(() => {
    http.get({
      host: process.env.HOST,
      port: process.env.PORT,
      path: '/api/v1',
      timeout: 500
    }, (res) => {
      res.on('data', (chunk) => {
        try {
          console.log(JSON.stringify(chunk));
        } catch (err) {
          console.log(err);
        }
      });
    }).on('error', (err) => {
      console.log(err);
    }).end(() => console.log('Done'));
  }, 120000);
};
