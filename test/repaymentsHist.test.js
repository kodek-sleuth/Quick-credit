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

describe('User should get loan repayment history', () => {
  it('Should fetch loan repayment history given right id', (done) => {
    chai.request(app).get('/api/v1/user/loans/1/repayments')
      .set('Authorization', `Bearer ${utils.userToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(200);
        expect(res.body).to.have.property('Message');
        expect(res.body).to.have.property('Data');
        done();
      });
  });

  it('Should not fetch loan repayment history given wrong id', (done) => {
    chai.request(app).get('/api/v1/user/loans/3211/repayments')
      .set('Authorization', `Bearer ${utils.userToken.Token}`)
      .end((error, res) => {
        expect(res.body.Status).to.equals(404);
        expect(res.body).to.have.property('Status');
        expect(res.body).to.have.property('Message');
        done();
      });
  });
});
