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

describe('Testing if app returns all Admin loan requests', () => {
  it('Should signup a user if he does not exist in database', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.adminCredLoan)
      .end((error, res) => {
        const userDetails = {
          Email: utils.adminCredLoan.Email,
          Password: utils.adminCredLoan.Password
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
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Data');
        expect(res.body).to.have.property('Count');
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
