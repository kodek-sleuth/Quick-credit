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
    chai.request(app).post('/api/v1/users/loans/repay')
      .send(utils.repayLoan)
      .end((error, res) => {
        expect(res.body.Status).to.have.property('201');
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });
});
