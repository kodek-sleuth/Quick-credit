/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');

const utils = require('./utils/utils');

describe('App Authorisation Login', () => {
  it('Should login user and return Success, Data, Token, Firstname, Lastname and Email', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginDetails)
      .end((error, res) => {
        expect(res.body.Status).to.have.property('200');
        expect(res.body).to.have.property('Success');
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Firstname');
        expect(res.body.Data).to.have.property('Lastname');
        expect(res.body.Data).to.have.property('Token');
        expect(res.body.Data).to.have.property('Email');
        expect(res.body.Data).to.have.property('Status');
        expect(res.body.Data).to.have.property('isAdmin');
        expect(res.body.Data).to.have.property('Address');
      });
  });

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
        expect(res.body.Status).to.equals(401);
        expect(res.body).to.have.property('Error');
        expect(res.body.Error).to.equals('Invalid Email or Password');
      });
  });
});
