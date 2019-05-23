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

describe('Admin should approve a user', () => {
  it('Admin should not approve without fast logging in', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/1/approve')
      .send(utils.userLoanApply)
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
        expect(res.body.Message).to.equals('Admin Authorisation required to access resource');
        done();
      });
  });

  it('Should approve a loan given right id', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/1/approve')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not approve a specific loan given wrong id', (done) => {
    chai.request(app).patch('/api/v1/admin/loans/02023/approve')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
