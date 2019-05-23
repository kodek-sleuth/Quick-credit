/* eslint-disable comma-dangle */
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

const usersArray = [];
const usersToken = [];

describe('Admin should verify a user', () => {
  it('Should signup a user if he does not exist in database', (done) => {
    // Signup admin
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupVerify)
      .end((error, res) => {
        const userDetails = {
          Email: utils.userSignupVerify.Email,
          Password: utils.userSignupVerify.Password
        };
        usersArray.push(userDetails);
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
        done();
      });
  });

  // Signup user
  it('Should login a user and return user success message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(usersArray[0])
      .end((error, res) => {
        const Token = {
          Token: res.body.Data.Token
        };
        usersToken.push(Token);
        expect(res.body.Status).to.equal(200);
        done();
      });
  });
  
  it('Admin should not verify without fast logging in', (done) => {
    chai.request(app).patch('/api/v1/admin/users/abel12@gmail.com/verify')
      .send(utils.userLoanApply)
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
        expect(res.body.Message).to.equals('Admin Authorisation required to access resource');
        done();
      });
  });

  it('Should verify a user given right email id', (done) => {
    chai.request(app).patch(`/api/v1/admin/users/${usersArray[0].Email}/verify`)
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not verify a specific user given wrong id', (done) => {
    chai.request(app).patch('/api/v1/admin/users/abel12@gmail.com2/verify')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
