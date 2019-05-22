/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import model from '../Api/Controllers/databaseController';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../App/server').server;

describe('App Should login a user', () => {
  it('Should login user', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLogin)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should return token after successfull login', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLogin)
      .end((error, res) => {
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
        done();
      });
  });

  it('Should return error message on invalid login', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginFake)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal('401');
        expect(res.body.Message).to.equals('Invalid Email or Password');
        done();
      });
  });

  it('Should login an admin and return  admin message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginAdmin)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('Admin has successfully logged in');
        done();
      });
  });

  it('Should login a user and return user success message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginUser)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('User has successfully logged in');
        done();
      });
  });
});
