const express = require('express');

const reject = express.Router();

const rejectUserController = require('../Controllers/verifyFeature');

reject.patch('/:Email/reject', rejectUserController.rejectUser);

module.exports = reject;
