/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../App/server').server;

describe('Admin should post transaction for a user', () => {
  it('Should not post transaction for loan without right authentication', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/1/transact')
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not post transaction for a user given wrong loanId id', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/99/transact')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Message');
        done();
      });
  });

  it('Should not post transaction for a loan not approved', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/121/transact')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
