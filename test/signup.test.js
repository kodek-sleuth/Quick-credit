/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../App/server';

import utils from './utils';

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
        expect(res.body.Success).to.equal('User has successfully signed up');
      });
  });
});
