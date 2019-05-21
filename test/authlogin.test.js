/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../App/server';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing if app Logs in user', () => {
  it('Should login a user if he does exist in database', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully logged in');
      });
  });

  it('Should login a user if he does exist in database', () => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Status');
        expect(res.body.Status).to.equals('200');
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        expect(res.body.Message).to.equals('User has successfully logged in');
      });
  });

  // it('Should return a usertoken on login', () => {
  //   request(app).post('/api/v1/auth/login')
  //     .set('Accept', 'application/json')
  //     .send(utils.userLogin)
  //     .expect('Content-Type', /json/)
  //     .end((error, res) => {
  //       expect(res.body).to.have.property('Data');
  //       expect(res.body.Data).to.have.property('Token');
  //     });
  // });

  // it('Should not login a user if he supplies wrong credentials', () => {
  //   request(app).post('/api/v1/auth/login')
  //     .set('Accept', 'application/json')
  //     .send(utils.userSignupNumbers)
  //     .expect('Content-Type', /json/)
  //     .end((error, res) => {
  //       console.log("data ", res.body)
  //       expect(res.body).to.have.property('Status');
  //       expect(res.body.Status).to.equals(200);
  //       expect(res.body).to.have.property('Message');
  //       expect(res.body.Message).to.equals('Invalid Email or Password');
  //     });
  // });
});
