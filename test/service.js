const chai = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app/server');
