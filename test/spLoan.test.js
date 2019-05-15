/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

describe('Testing if Admin can get a specific loan', () => {
  it('Should return a specific loan', () => {
    chai.request(app).post('/api/v1/loans/93')
      .end((error, res) => {
        expect(res.body.Status).to.equal('200');
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not return a loan given wrong id', () => {
    chai.request(app).post('/api/v1/loans/:loanId')
      .end((error, res) => {
        expect(res.body.Status).to.equal('400');
        expect(res.body).to.have.property('Error');
      });
  });
});
