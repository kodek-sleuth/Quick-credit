/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('App Authorisation Signup', () => {
  it('Should signup user', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Sucess');
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
        expect(res.body.Data).to.have.property('Email');
        expect(res.body.Status).to.equals(201);
        expect(res.body.Success).to.equals('User successfully signed up');
      });
  });

  it('Should not signup new user if his email already exists', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupEmailTaken)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Email is already taken');
        expect(res.body.Status).to.equals(400);
      });
  });


  it('Should not signup new user if his name/email/isAdmin is an missing', () => {
    // Incase of a fullname that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupMissingFields)
      .end((error, res) => {
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Email, firstname, lastname, Password fields are required');
        expect(res.body.Status).to.equals(400);
      });
  });
});
