/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app/server';

import utils from './utils/utils';

const expect = chai.expect;

chai.use(chaiHttp);

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
