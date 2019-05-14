const http = require('http');

const app = require('./mainApp');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

module.exports = server;