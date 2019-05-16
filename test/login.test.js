/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should not login in user who does not exist', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userFalseDetails)
      .end((error, res) => {
        expect(res.body.Status).to.equals(401);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Invalid Email or Password');
      });
  });

  it('Should not login in admin with False Email/Password', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userFalseDetails)
      .end((error, res) => {
        expect(res.body.Status).to.equal(401);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Invalid Email or Password');
      });
  });
});
