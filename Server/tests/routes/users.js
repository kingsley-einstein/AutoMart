/* eslint-disable no-undef */
import { hashSync, genSaltSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import chai from '../config';
import app from '../..';
import { authObj } from '../../auth/passport';

// chai.should();

const { options } = authObj;

describe('USER ROUTES TEST', () => {
  describe('GET', () => {
    it('should send an array of data', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isArray(data);
          done();
        });
    });
    it('should have a status of 200', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should get a user with specific id', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.isNotNull(data);
          done();
        });
    });
    it('should check if specific keys exist on user object', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          const { data } = res.body;
          chai.assert.hasAnyKeys(data, ['token', 'email', 'password', 'id', 'is_admin']);
          done();
        });
    });
  });
  describe('POST', () => {
    it('should create a new user', (done) => {
      const user = {
        email: 'user@test.com',
        first_name: 'Test',
        last_name: 'User',
        is_admin: true,
        address: '5, Andrei street, Cosgrove way',
        phone_number: '+2356789388398837',
        password: hashSync('password', genSaltSync(10)),
        token: jwt.sign({ email: 'user@test.com' }, options.secretOrKey)
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          done();
        });
    });
    it('should log a user in', (done) => {
      const login = {
        email: 'user@test.com',
        password: 'password'
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((err, res) => {
          res.should.have.status(401);
          console.log(res.body);
          done();
        });
    });
    it('should check for duplicates', (done) => {
      const user = {
        email: 'user@test.com',
        first_name: 'Test',
        last_name: 'User',
        is_admin: true,
        address: '5, Andrei street, Cosgrove way',
        phone_number: '+2356789388398837',
        password: hashSync('password', genSaltSync(10)),
        token: jwt.sign({ email: 'user@test.com' }, options.secretOrKey)
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          chai.assert.hasAnyKeys(res.body, ['error']);
          done();
        });
    });
  });
});
