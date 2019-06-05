import chai from '../config';
import app from '../..';

describe('FLAG ROUTES TEST', () => {
  describe('POST', () => {
    it('should flag an AD', (done) => {
      const body = {
        car_id: 1,
        created_on: new Date(),
        reason: 'Weird demands',
        description: 'No description'
      };
      chai
        .request(app)
        .post('/api/v1/flag')
        .send(body)
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          console.log(data);
          done(err);
        });
    });
  });
  describe('GET', () => {
    it('should get all flags', (done) => {
      chai
        .request(app)
        .get('/api/v1/flag')
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          console.log(data);
          done(err);
        });
    });
    it('should get a flag with specific id', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/flag/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          console.log(data);
          done(err);
        });
    });
  });
  describe('DELETE', () => {
    it('should delete a flag', (done) => {
      const id = 1;
      chai
        .request(app)
        .delete(`/api/v1/flag/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isString(data);
          console.log(data);
          done(err);
        });
    });
  });
});
