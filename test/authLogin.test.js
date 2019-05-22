/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../App/server';

import model from '../Api/Controllers/databaseController';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App Should login a user', () => {
  it('Should login user', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLogin)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
      });
  });

  it('Should return token after successfull login', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLogin)
      .end((error, res) => {
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
      });
  });

  it('Should return error message on invalid login', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginFake)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal('401');
        expect(res.body.Message).to.equals('Invalid Email or Password');
      });
  });

  it('Should login an admin and return  admin message', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginAdmin)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('Admin has successfully logged in');
      });
  });

  it('Should login a user and return user success message', () => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginUser)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('User has successfully logged in');
      });
  });
});
