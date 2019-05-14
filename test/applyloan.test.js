/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should apply for loan given the right credentials', (done) => {
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

  it('Should not apply for loan given the user already has a loan unrepaid', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('Should not apply for loan given the user is not verified', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('Should not apply for loan given the user is not enters wrong data', (done) => {
    library.server.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        done();
      });
  });
});
