/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('Repay Loan', () => {
  it('Should repay loan given the right credentials', () => {
    chai.request(app).post('/api/v1/user/loans/2/repayment')
      .send(utils.repayLoan)
      .end((error, res) => {
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not repay loan given wrong id', () => {
    chai.request(app).post('/api/v1/user/loans/22/repayment')
      .send(utils.repayLoan)
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Loan with that Id does not exist');
      });
  });

  it('Should not repay loan given repayer is not a user', () => {
    chai.request(app).post('/api/v1/user/loans/2/repayment')
      .send(utils.repayLoanEmail)
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Please signup to repay loan');
      });
  });
});
