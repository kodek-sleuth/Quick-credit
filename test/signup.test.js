/* eslint-disable global-require */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../App/server').server;

describe('App Should Signup a user', () => {
  it('Should signup a user if he does not exist in database', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
        done();
      });
  });

  it('Should not signup a user if he enters an email that exists', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupExist)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(409);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not signup user if he does not provide valid email address', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupEmail)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(400);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not signup user if he provides valid numbers in name fields', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupNumbers)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(400);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not signup user if he doesnot provide required fields', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupFields)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(400);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not signup user provides a short name', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupName)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(400);
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
