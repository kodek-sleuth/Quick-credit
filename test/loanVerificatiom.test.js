/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');


describe('Approve Loan', () => {
  it('Should verify loan given the right Id', () => {
    chai.request(app).patch('/api/v1/admin/loans/2/approve')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not verify loan given wrong id', () => {
    chai.request(app).patch('/api/v1/admin/loans/12/approve')
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('No loan exists with that Id');
      });
  });
});

describe('Reject Loan', () => {
  it('Should reject loan given the right Id', () => {
    chai.request(app).patch('/api/v1/admin/loans/2/reject')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not reject loan given wrong id', () => {
    chai.request(app).patch('/api/v1/admin/loans/12/reject')
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('No loan exists with that Id');
      });
  });
});
