const http = require('http');

const app = require('../App/main_app');

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port)