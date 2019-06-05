import http from 'http';

export const preventIdle = () => {
  setInterval(() => {
    http.get({
      host: 'automart-andela.herokuapp.com',
      port: process.env.PORT,
      path: '/api/v1',
      timeout: 200
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
