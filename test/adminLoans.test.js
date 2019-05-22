/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../App/server';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing if app returns all Admin loan requests', () => {
  it('Should return all repaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/repaid')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
      });
  });

  it('Should return all unrepaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
      });
  });

  it('Should return all loans', () => {
    chai.request(app).get('/api/v1/admin/loans')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Count');
      });
  });

  it('Should return a specific loan given right id', () => {
    chai.request(app).get('/api/v1/admin/loans/1')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Data');
        expect(res.body).to.have.property('Count');
      });
  });

  it('Should not return a specific loan given wrong id', () => {
    chai.request(app).get('/api/v1/admin/loans/2')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
      });
  });
});
