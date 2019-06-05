import chai from '../config';
import app from '../..';

describe('ORDER ROUTES TEST', () => {
  describe('GET', () => {
    it('should get order with specific id', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/order/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          console.log(data);
          done(err);
        });
    });
    it('should count orders made by user', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/orders/${id}/count`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNumber(data);
          console.log(data);
          done(err);
        });
    });
    it('should count purchase requests', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/orders/${id}/seller/count`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNumber(data);
          console.log(data);
          done(err);
        });
    });
    it('should get orders made by user', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/orders/${id}/buyer`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          res.should.have.status(200);
          console.log(data);
          done(err);
        });
    });
    it('should get purchase requests', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/orders/${id}/seller`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          res.should.have.status(200);
          console.log(data);
          done(err);
        });
    });
  });
  describe('POST', () => {
    it('should create an order', (done) => {
      const order = {
        buyer: 1,
        car_id: 1,
        amount: 456.8,
        status: 'pending'
      };
      chai
        .request(app)
        .post('/api/v1/order')
        .send(order)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          res.should.have.status(200);
          console.log(data);
          done(err);
        });
    });
  });
  describe('PATCH', () => {
    it('should update an order price', (done) => {
      const id = 1;
      const body = {
        price: 130.0
      };
      chai
        .request(app)
        .patch(`/api/v1/order/${id}/price`)
        .send(body)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.hasAnyKeys(data, ['old_price_offered', 'new_price_offered']);
          console.log(data);
          done(err);
        });
    });
    it('should update an order status', (done) => {
      const id = 1;
      const body = {
        status: 'approved'
      };
      chai
        .request(app)
        .patch(`/api/v1/order/${id}/status`)
        .send(body)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          console.log(data);
          done(err);
        });
    });
  });
});
