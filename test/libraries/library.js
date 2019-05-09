
const supertest = require('supertest');

exports.expect = require('chai').expect;

exports.server = supertest('http://localhost:3000');
