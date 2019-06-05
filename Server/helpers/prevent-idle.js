import http from 'http';

export const preventIdle = () => {
  setInterval(() => {
    http.get({
      host: 'https://automart-andela.herokuapp.com',
      port: process.env.PORT,
      path: '/api/v1'
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
    });
  }, 120000);
};
