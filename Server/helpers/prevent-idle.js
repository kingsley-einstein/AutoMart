import http from 'http';

export const preventIdle = () => {
  setInterval(() => {
    http.get({
      port: process.env.PORT,
      path: '/api/v1'
    }, (res) => {
      res.on('data', (chunk) => {
        try {
          console.log(chunk);
        } catch (err) {
          console.log(err);
        }
      });
    }).on('error', (err) => {
      console.log(err);
    });
  }, 10 * 60 * 1000);
};
