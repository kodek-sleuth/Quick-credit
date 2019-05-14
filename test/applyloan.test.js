/* eslint-disable no-undef */

const service = require('../test/service');

const utils = require('./utils/utils');

describe('Apply Loan', () => {
  it('Should apply for loan given the right credentials', (done) => {
    service.post('/api/v1/loans/apply')
      .set('Accept', 'application/json')
      .send(userDetails.loanApplication)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('201');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not apply for loan given the user already has a loan unrepaid', (done) => {
    service.post('/api/v1/loans/apply')
      .set('Accept', 'application/json')
      .send(userDetails.loanExists)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('409');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Please repay old loan to apply for this loan');
        done();
      });
  });

  it('Should not apply for loan given the user is not verified', (done) => {
    service.post('/api/v1/loans/apply')
      .set('Accept', 'application/json')
      .send(userDetails.loanApplication)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('User has to be verified to apply for this loan');
        done();
      });
  });

  it('Should not apply for loan given the user enters wrong data', (done) => {
    service.post('/api/v1/loans/apply')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.have.property('Please enter correct data');
        done();
      });
  });
});
