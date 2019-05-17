/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

const expect = chai.expect;

chai.use(chaiHttp);

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
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('No loan exists with that Id');
      });
  });
});
