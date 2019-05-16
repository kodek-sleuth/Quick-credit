/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

import utils from './utils/utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Apply Loan', () => {
  it('Should apply for loan given the right credentials', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanApplication)
      .end((error, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not apply for loan given the user does not submit amount and tenor', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Email, Amount and Tenor fields are required');
      });
  });

  it('Should not apply for loan given the user enters strings in the req body', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanApplicationString)
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Amount and Tenor should be numbers only while Email is string');
      });
  });

  it('Should not apply for loan given that tenor is greater than 12', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanApplicationTenor)
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Tenor should be less than 12 months');
      });
  });

  it('Should not apply for loan given that amount is less than 5000', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanApplicationAmount)
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Amount should be greater than 4999 shillings');
      });
  });
});
