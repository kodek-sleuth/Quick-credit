/* eslint-disable no-unused-expressions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */

const supertest = require('supertest');

const chai = require('chai').expect;

const app = require('../test/newServer');

const testApp = require('../App/server');

// Describe(mocha) is used to group the testcases while it(chai) is used to write the real testcases
// supertest takes in the server app and enables us to make requests to the api

describe('Testing if app returns all loans successfully', () => {
    it('Returns all loans', (done) => {
        supertest(testApp).get('/admin/users')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
});
