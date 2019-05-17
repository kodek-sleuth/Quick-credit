/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Admin Transactions', () => {
  it('Admin should post transaction of a loan', () => {
    chai.request(app).patch('/api/v1/admin/loans/2/transac')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
        expect(res.body.Success).to.equals('Admin successfully posted loan for user');
      });
  });

  it('Admin should fail to post transaction of loan id that does not exist', () => {
    chai.request(app).patch('/api/v1/admin/loans/11/transac')
      .end((error, res) => {
        expect(res.body.Status).to.equal(404);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('No loan exists with that Id');
      });
  });
});
