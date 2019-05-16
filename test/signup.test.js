/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

import utils from './utils/utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App Authorisation Signup', () => {
  it('Should signup user if he does not exist in db', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
        expect(res.body.Data).to.have.property('Email');
        expect(res.body.Status).to.equal(201);
        expect(res.body.Success).to.equal('User successfully signed up');
      });
  });

  it('Should not signup new user if his email already exists', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupEmailTaken)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('User with that Email Exists');
        expect(res.body.Status).to.equal(400);
      });
  });


  it('Should not signup new user if his name/email/isAdmin is an missing', () => {
    // Incase of a fullname that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupMissingFields)
      .end((error, res) => {
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Email, Firstname, Lastname, Password and isAdmin fields are required');
        expect(res.body.Status).to.equals(400);
      });
  });

  it('Should not signup new user if his password is short', () => {
    // Incase of a fullname that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupShortPassword)
      .end((error, res) => {
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Password should be 6 or more characters');
        expect(res.body.Status).to.equals(400);
      });
  });
});
