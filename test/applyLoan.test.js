/* eslint-disable comma-dangle */
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

const usersArray = [];
const usersToken = [];

describe('User should apply for a loan', () => {
  it('User should not apply for loan without authentication first', (done) => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.userLoanApply)
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
        expect(res.body.Message).to.equals('User Authorisation required to access resource');
        done();
      });
  });

  it('Should signup a user if he does not exist in database', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupLoan)
      .end((error, res) => {
        const userDetails = {
          Email: utils.userSignupLoan.Email,
          Password: utils.userSignupLoan.Password
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

  it('Should verify a user given right email id', (done) => {
    chai.request(app).patch(`/api/v1/admin/users/${usersArray[0].Email}/verify`)
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should login a user and return user success message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(usersArray[0])
      .end((error, res) => {
        const Token = {
          Token: res.body.Data.Token
        };
        usersToken.push(Token);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('User has successfully logged in');
        done();
      });
  });

  it('User should not apply for loan with Tenor greater than 12 months', (done) => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .set('Authorization', `Bearer ${utils.TenorToken.Token}`)
      .send(utils.userLoanApplyTenor)
      .end((error, res) => {
        expect(res.body.Status).to.equals(403);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should apply for a loan given right credentials', (done) => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .send(utils.userLoanApply)
      .end((error, res) => {
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        done();
      });
  });

  // it('User should not apply for new loan with an unrepaid loan', (done) => {
  //   chai.request(app).post('/api/v1/user/loans/apply')
  //     .set('Authorization', `Bearer ${utils.userToken.Token}`)
  //     .send(utils.userLoanApply)
  //     .end((error, res) => {
  //       expect(res.body.Status).to.equals(403);
  //       expect(res.body).to.have.property('Message');
  //       done();
  //     });
  // });

  it('User should not apply for loan without being verified first', (done) => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .set('Authorization', `Bearer ${utils.userTokenUnverified.Token}`)
      .send(utils.userLoanApply)
      .end((error, res) => {
        expect(res.body.Status).to.equals(403);
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
