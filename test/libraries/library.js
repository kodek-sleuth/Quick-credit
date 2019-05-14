const app = require('./serverApp');

const supertest = require('supertest');

exports.expect = require('chai').expect;

exports.server = supertest(app);
