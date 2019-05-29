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
