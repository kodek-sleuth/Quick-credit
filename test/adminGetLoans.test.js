/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing if app returns all Admin loan requests', () => {
  it('Should return all repaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/repaid?status=Approved&repaid=True')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should return all unrepaid loans', () => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid?status=Approved&repaid=False')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should return an error when supplied with wrong query string for unrepaid', () => {
    chai.request(app).get('/api/v1/admin/loans/unrepaid?status=Approve&repaid=False')
      .end((error, res) => {
        expect(res.body.Status).to.equal(404);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Please use Approved and False');
      });
  });

  it('Should return an error when supplied with wrong query string for repaid', () => {
    chai.request(app).get('/api/v1/admin/loans/repaid?status=Approvd&repaid=False')
      .end((error, res) => {
        expect(res.body.Status).to.equal(404);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Please use Approved and True');
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
