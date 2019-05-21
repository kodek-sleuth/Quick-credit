/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import pg from 'pg';

import app from '../App/server';

import utils from './utils';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

const expect = chai.expect;

chai.use(chaiHttp);

describe('App Authorisation Login', () => {
  it('Should signup a user if he does not exist in database', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals('200');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
      });
  });

  it('Should login a user if he does exist in database', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals('200');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully logged in');
      });
  });

  it('Should return a usertoken on login', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
      });
  });

  it('Should not login a user if he supplies wrong credentials', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userSignupNumbers)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals('401');
        expect(res.body).to.have.property('Message');
        expect(res.body.Message).to.equals('Invalid Email or Password');
      });
  });
  


});
