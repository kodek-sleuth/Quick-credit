/* eslint-disable no-undef */

const library = require('./libraries/library');

const userDetails = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Admin Should post transaction of a loan', (done) => {
    library.server.post('/api/v1/admin/loans/:loanId/transac')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('201');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        library.expect(res.body).to.have.property('Token');
        library.expect(res.body.Data).to.have.property('Fullname');
        library.expect(res.body.Data).to.have.property('Email');
        exports.token = res.body.Token;
        done();
      });
  });

  it('Admin Should not post transaction of a loan that is not verified', (done) => {
    library.server.post('/api/v1/admin/loans/:loanId/transac')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('409');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        library.expect(res.body.Data).to.have.property('Fullname');
        library.expect(res.body.Data).to.have.property('Email');
        done();
      });
  });

  it('Admin Should not post transaction of a loan that has been repaid', (done) => {
    library.server.post('/api/v1/admin/loans/:loanId/transac')
      .set('Accept', 'application/json')
      .send(userDetails.adminLoginDetails)
      .expect('Content-Type', /json/)
      .end((error, res) => {
        library.expect(res.body.Status).to.have.property('201');
        library.expect(res.body).to.have.property('Success');
        library.expect(res.body).to.have.property('Data');
        library.expect(res.body.Data).to.have.property('Fullname');
        library.expect(res.body.Data).to.have.property('Email');
        done();
      });
  });

});