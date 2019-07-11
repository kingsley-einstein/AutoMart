// import http from 'http';

// export const preventIdle = () => {
//   setInterval(() => {
//     http.get('http://automart-andela.herokuapp.com/api/v1', (res) => {
//       res.on('data', (chunk) => {
//         try {
//           console.log(JSON.stringify(chunk));
//         } catch (err) {
//           console.log(err);
//         }
//       });
//     }).on('error', (err) => {
//       console.log(err);
//     }).end(() => console.log('Done'));
//   }, 120000);
// };
