/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../App/server';

import model from '../Api/Controllers/databaseController';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App Should Signup a user', () => {
  it('Should signup a user if he does not exist in database', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
      });
  });

  it('Should not signup a user if he enters an email that exists', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupExist)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(409);
        expect(res.body).to.have.property('Message');
      });
  });

  it('Should not signup user if he does not provide required fields', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupFields)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(409);
        expect(res.body).to.have.property('Message');
      });
  });
});
