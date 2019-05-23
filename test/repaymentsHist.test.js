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
const userOnly = [];
const loanUser = [];
const userToken = [];
const usersToken = [];


describe('User should get loan repayment history', () => {
  // it('Should fetch loan repayment history given right id', (done) => {
  //   chai.request(app).get('/api/v1/user/loans/1/repayments')
  //     .set('Authorization', `Bearer ${utils.userToken.Token}`)
  //     .end((error, res) => {
  //       expect(res.body.Status).to.equals(200);
  //       expect(res.body).to.have.property('Message');
  //       expect(res.body).to.have.property('Data');
  //       done();
  //     });
  // });

  // Signup User
  it('Should signup a user if he does not exist in database', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userHistory)
      .end((error, res) => {
        const userDetails2 = {
          Email: utils.userHistory.Email,
          Password: utils.userHistory.Password
        };
        userOnly.push(userDetails2);
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
        done();
      });
  });

  // Login User
  it('Should login a user and return user success message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(userOnly[0])
      .end((error, res) => {
        const Token = {
          Token: res.body.Data.Token
        };
        userToken.push(Token);
        expect(res.body.Status).to.equal(200);
        done();
      });
  });

  
  it('Should not fetch loan repayment history given wrong id', (done) => {
    chai.request(app).get('/api/v1/user/loans/3211/repayments')
      .set('Authorization', `Bearer ${userToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
