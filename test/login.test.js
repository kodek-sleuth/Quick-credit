/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should login an admin', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('Should return token, success, status and data keys and values', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        library.expect(res.body).to.have.property('Token');
        library.expect(res.body.Data).to.have.property('Fullname');
        library.expect(res.body.Data).to.have.property('Email');
        exports.token = res.body.Token;
        done();
      });
  });
});
