/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

describe('Testing if app returns all User repayments', () => {
  it('Should return all loan repayments provided right id', () => {
    chai.request(app).get('/api/v1/user/loans/2/repayments')
      .end((error, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not return history given wrong id', () => {
    chai.request(app).get('/api/v1/user/loans/1/repayments')
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('No loan exists with that Id');
      });
  });
});
