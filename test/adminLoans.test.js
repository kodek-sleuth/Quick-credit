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

describe('Testing if app returns all Admin loan requests', () => {
  it('Should signup a user if he does not exist in database', (done) => {
    // Signup Admin
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupLoanAdmin)
      .end((error, res) => {
        const userDetails = {
          Email: utils.userSignupLoanAdmin.Email,
          Password: utils.userSignupLoanAdmin.Password
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

  // Signup User
  it('Should signup a user if he does not exist in database', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupLoanUser)
      .end((error, res) => {
        const userDetails2 = {
          Email: utils.userSignupLoanUser.Email,
          Password: utils.userSignupLoanUser.Password
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


  // Verify User
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

  it('Should return all repaid loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans/repaid')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return all unrepaid loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return all loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return a specific loan given right id', (done) => {
    chai.request(app).get('/api/v1/admin/loans/1')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        done();
      });
  });

  it('Should not return a specific loan given wrong id', (done) => {
    chai.request(app).get('/api/v1/admin/loans/220990')
      .set('Authorization', `Bearer ${usersToken[0].Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
