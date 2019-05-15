/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('Apply Loan', () => {
  it('Should apply for loan given the right credentials', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanApplication)
      .end((error, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not apply for loan given the user already has a loan unrepaid', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.loanExists)
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('User must repay old loan to apply for new loan');
      });
  });

  it('Should not apply for loan given the user is not verified', () => {
    chai.request(app).post('/api/v1/user/loans/apply')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('User must be verified to use resource');
      });
  });
});
