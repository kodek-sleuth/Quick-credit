/* eslint-disable no-undef */

const service = require('../test/service');

const utils = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should login admin and return Success, Data, Token, Fullname and Email', (done) => {
    service.post('/api/v1/auth/login')
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
        library.expect(res.body.Data).to.have.property('Status');
        library.expect(res.body.Data).to.have.property('isAdmin');
        library.expect(res.body.Data).to.have.property('Address');
        done();
      });
  });

  it('Should login user and return Success, Data, Token, Fullname and Email', (done) => {
    service.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.userLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('200');
        library.expect(res.body).to.have.property('Data');
        library.expect(res.body).to.have.property('Token');
        library.expect(res.body.Data).to.have.property('Fullname');
        library.expect(res.body.Data).to.have.property('Email');
        done();
      });
  });

  it('Should not login in user who does not exist', (done) => {
    service.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.userFalseDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Invalid Email or Password');
        done();
      });
  });

  it('Should not login in admin with false email/password', (done) => {
    service.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.adminFalseDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Invalid Email or Password');
        done();
      });
  });

  it('Should not login in user with false email/password', (done) => {
    service.post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send(userDetails.userFalseDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('401');
        library.expect(res.body).to.have.property('Error');
        library.expect(res.body.Error).to.equals('Invalid Email or Password');
        done();
      });
  });
});
