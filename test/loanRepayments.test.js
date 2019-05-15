/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('Testing if app returns all User repayments', () => {
  it('Should return all repaid loans', () => {
    chai.request(app).post('/api/v1/loans/93/repayments')
      .send(utils.repayLoan)
      .end((error, res) => {
        expect(res.body.Status).to.have.property('200');
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });
});
