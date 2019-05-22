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

describe('Testing if app returns all Admin loan requests', () => {
  it('Should return all repaid loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans/repaid')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return all unrepaid loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return all loans', (done) => {
    chai.request(app).get('/api/v1/admin/loans')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should return a specific loan given right id', (done) => {
    chai.request(app).get('/api/v1/admin/loans/1')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Data');
        expect(res.body).to.have.property('Count');
        done();
      });
  });

  it('Should not return a specific loan given wrong id', (done) => {
    chai.request(app).get('/api/v1/admin/loans/22')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
