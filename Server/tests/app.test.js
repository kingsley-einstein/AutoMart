import chai, { request } from './config';
import app from '..';

describe('LOADING EXPRESS SERVER', () => {
  let server;
  beforeEach(() => {
    server = app.listen(3000, () => console.log('Started server'));
  });
  afterEach(() => {
    server.close();
  });
  it('runs on specified port', (done) => {
    const { port } = server.address();
    chai.expect(port).to.eql(3000);
    done();
  });
  it('responds to a call to /', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200, done);
  });
  it('sends welcome message', (done) => {
    request(server)
      .get('/api/v1')
      .end((err, res) => {
        const { body } = res;
        chai.assert.hasAllKeys(body, ['message']);
        done(err);
      });
  });
});
