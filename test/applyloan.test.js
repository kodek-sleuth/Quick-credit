/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should apply for loan given the right credentials admin and return Success, Data, Token, Fullname and Email', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('200');
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
