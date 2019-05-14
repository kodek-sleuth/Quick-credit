/* eslint-disable import/order */

const supertest = require('supertest');

exports.expect = require('chai').expect;

const app = require('..')

exports.server = supertest(app);
