/* eslint-disable comma-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../App/server').server;

const usersArray = [];

describe('App Should login a user', () => {
  it('Should signup a user if he does not exist in database', (done) => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignupLoginUser)
      .end((error, res) => {
        const userDetails = {
          Email: utils.userSignupLoginUser.Email,
          Password: utils.userSignupLoginUser.Password
        };

        usersArray.push(userDetails);
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals(201);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully signed up');
        done();
      });
  });

  it('Should login a user and return user success message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(usersArray[0])
      .end((error, res) => {
        expect(res.body.Status).to.equal(200);
        done();
      });
  });

  it('Should return token after successfull login', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(usersArray[0])
      .end((error, res) => {
        expect(res.body).to.have.property('Data');
        expect(res.body.Data).to.have.property('Token');
        done();
      });
  });

  it('Should return error message on invalid login', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginFake)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(401);
        expect(res.body.Message).to.equals('Invalid Email or Password');
        done();
      });
  });

  it('Should login an admin and return  admin message', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginAdmin)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(200);
        expect(res.body.Message).to.equals('Admin has successfully logged in');
        done();
      });
  });


  it('Should not login with invalid email address', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(utils.userLoginFakeEmail)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        expect(res.body.Status).to.equal(400);
        done();
      });
  });
});
