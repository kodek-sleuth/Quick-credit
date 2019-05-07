
const http = require('http');

const app = require('../App/mainApp');

const port = 8000;

const server = http.createServer(app);

server.listen(port);

module.exports = server;
