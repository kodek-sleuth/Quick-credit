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

describe('Admin should verify a user', () => {
  it('Should reject a loan given right id', () => {
    chai.request(app).patch('/api/v1/admin/loans/1/reject')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not reject a specific loan given wrong id', () => {
    chai.request(app).patch('/api/v1/admin/loans/3/reject')
      .set('Authorization', `Bearer ${utils.adminToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
      });
  });
});
