
const express = require('express');

const verify = express.Router();

const verifyUserController = require('../Controllers/verifyFeature');

verify.patch('/:Email/verify', verifyUserController.verifyUser);

module.exports = verify;
