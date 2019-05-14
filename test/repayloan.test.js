/* eslint-disable no-undef */

const service = require('../test/service');

const utils = require('./utils/utils');

describe('Repay Loan', () => {
  it('Should repay loan given the right credentials', (done) => {
    service.post('/api/v1/users/loans/repay')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('201');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not repay a loan that is not approved', (done) => {
    service.post('/api/v1/users/loans/repay')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('409');
        library.expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('Should not repay a loan that is already repaid', (done) => {
    service.post('/api/v1/users/loans/repay')
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
