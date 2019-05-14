const library = require('./libraries/library');

const utils = require('./utils/utils');

const token = require('./login.test');

// Describe(mocha) is used to group the testcases while it(chai) is used to write the real testcases
// supertest takes in the server app and enables us to make requests to the api

describe('Testing if app returns all User repayments', () => {
  it('Should return all repaid loans', (done) => {
    library.server.post('/api/v1/loans/:loanId/repayments')
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
});
