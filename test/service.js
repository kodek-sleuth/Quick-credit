exports.chai = require('chai');

const supertest = require('supertest');

const app = require('../app/server');

exports.newApp = supertest(app);
