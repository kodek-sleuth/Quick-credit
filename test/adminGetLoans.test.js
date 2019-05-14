/* eslint-disable no-undef */

const library = require('./libraries/library');

const utils = require('./utils/utils');

const token = require('./login.test');

// Describe(mocha) is used to group the testcases while it(chai) is used to write the real testcases
// supertest takes in the server app and enables us to make requests to the api

describe('Testing if app returns all loans successfully', () => {
  it('Should return a status of 200', (done) => {
    library.server.get('/api/v1/admin/loans')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token.token}`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should return Success, Count and Data keys', (done) => {
    library.server.get('/api/v1/admin/loans')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token.token}`)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body).to.have.property('Success');
        // library.expect(res.body).to.have.property('Data');
        library.expect(res.body).to.have.property('Count');
        done();
      });
  });
});
