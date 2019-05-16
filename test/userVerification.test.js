/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');


describe('Verify User', () => {
  it('Should verify loan given the right Id', () => {
    chai.request(app).patch('/api/v1/admin/users/kelvin@gmail.com/verify')
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
      });
  });

  it('Should not verify user given wrong emailid', () => {
    chai.request(app).patch('/api/v1/admin/users/klvin@gmail.com/verify')
      .end((error, res) => {
        expect(res.body.Status).to.equal(400);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('User with that Email does not exist');
      });
  });
});
