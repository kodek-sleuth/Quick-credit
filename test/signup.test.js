/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import request from 'supertest';

import app from '../App/server';

import utils from './utils';

const expect = chai.expect;

chai.use(chaiHttp);

// describe('App Authorisation Signup', () => {
//   it('Should not signup user if he does not provide required fields', (done) => {
//     // Incase of an email that exists in database
//     request(app).post('/api/v1/auth/signup')
//       .set('Accept', 'application/json')
//       .send(utils.userSignupFields)
//       .expect('Content-Type', /json/)
//       .end((error, res) => {
//         expect(res.body).to.have.property('Status');
//         expect(res.body.Status).to.equals('409');
//         expect(res.body).to.have.property('Message');
//         done();
//       });
//   });
// });
