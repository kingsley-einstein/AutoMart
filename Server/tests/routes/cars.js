/* eslint-disable no-undef */
import app from '../..';
import chai from '../config';

describe('CAR ROUTES TEST', () => {
  describe('GET', () => {
    it('should send a car with specific id', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/car/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          res.should.have.status(200);
          done();
        });
    });
    it('should get cars by specific status', (done) => {
      const status = 'available';
      chai.request(app)
        .get(`/api/v1/car?status=${status}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          res.should.have.status(200);
          done();
        });
    });
    it('should get cars by specific body type', (done) => {
      const bodyType = 'car';
      chai.request(app)
        .get(`/api/v1/car?body_type=${bodyType}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          chai.expect(data).length.to.be.greaterThan(0);
          done();
        });
    });
  });
});
