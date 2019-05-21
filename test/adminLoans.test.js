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
        expect(res.body).to.have.property('Message');
      });
  });

  it('Should return all unrepaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
      });
  });

  it('Should return all loans', () => {
    chai.request(app).get('/api/v1/admin/loans')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body).to.have.property('Message');
      });
  });
});
