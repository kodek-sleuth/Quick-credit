/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

describe('Repay Loan', () => {
  it('Should repay loan loan given the right credentials', (done) => {
    library.server.post('/api/v1/auth/login')
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
});
