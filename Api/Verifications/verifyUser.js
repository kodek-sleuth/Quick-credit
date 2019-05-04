
const express = require('express');

const verify = express.Router();

const verifyUserController = require('../Controllers/verifyFeature');

const jwtMiddleware = require('../Settings/checkAuthAdmin');

verify.patch('/:Email/verify', jwtMiddleware, verifyUserController.verifyUser);

module.exports = verify;
