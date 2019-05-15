/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

describe('Admin Transactions', () => {
  it('Admin Should post transaction of a loan', () => {
    chai.request(app).post('/api/v1/admin/loans/:loanId/transac')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Lastname');
        expect(res.body.Data).to.have.property('Firstname');
        expect(res.body.Data).to.have.property('Email');
      });
  });

  it('Admin Should not post transaction of a loan that is not verified', () => {
    chai.request(app).post('/api/v1/admin/loans/:loanId/transac')
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Status');
      });
  });
});
