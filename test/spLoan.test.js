/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing if Admin can get a specific loan', () => {
  it('Should return a specific loan', () => {
    chai.request(app).get('/api/v1/admin/loans/2')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not return a loan given wrong id', () => {
    chai.request(app).get('/api/v1/admin/loans/4')
      .end((error, res) => {
        expect(res.body.Status).to.equal(404);
        expect(res.body.Error).to.equals('Loan with that Id does not exist');
        expect(res.body).to.have.property('Error');
      });
  });
});
