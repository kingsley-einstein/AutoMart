import chai from '../config';
import app from '../..';

describe('SWAGGER TEST', () => {
  describe('GET', () => {
    it('should show docs', (done) => {
      chai
        .request(app)
        .get('/api/v1/docs')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
});
