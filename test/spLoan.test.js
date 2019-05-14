/* eslint-disable no-undef */

const service = require('../test/service');

const utils = require('./utils/utils');

// Describe(mocha) is used to group the testcases while it(chai) is used to write the real testcases
// supertest takes in the server app and enables us to make requests to the api

describe('Testing if Admin can get a specific loan', () => {
  it('Should return a specific loan', (done) => {
    service.post('/api/v1/loans/:loanId')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('200');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not return a loan given wrong id', (done) => {
    service.post('/api/v1/loans/:loanId')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('409');
        library.expect(res.body).to.have.property('Error');
        done();
      });
  });
});