/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import request from 'supertest';

import app from '../App/server';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing if app returns all Admin loan requests', () => {
  it('Should return all repaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/repaid')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should return all unrepaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should return all loans', () => {
    chai.request(app).get('/api/v1/admin/loans')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });
});