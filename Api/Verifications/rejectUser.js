const express = require('express');

const reject = express.Router();

const rejectUserController = require('../Controllers/verifyFeature');

const jwtMiddleware = require('../Settings/checkAuth');

reject.patch('/:Email/reject', jwtMiddleware, rejectUserController.rejectUser);

module.exports = reject;
