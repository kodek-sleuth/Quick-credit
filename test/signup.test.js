/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import pg from 'pg';

import app from '../App/server';

import utils from './utils';

const Pool = pg.Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

const expect = chai.expect;

chai.use(chaiHttp);

describe('App Authorisation Signup', () => {
  it('Should signup user if he does not exist in db', () => {
    // Incase of an email that exists in database
    chai.request(app).post('/api/v1/auth/signup')
      .send(utils.userSignup)
      .end((error, res) => {
        expect(res.body).to.have.property('Error');  
      });
  });
});
