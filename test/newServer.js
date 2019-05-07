/* eslint-disable no-console */

const http = require('http');

const app = require('../App/mainApp');

const port = 7000;

const server = http.createServer(app);

server.listen(port);

module.exports = server;
