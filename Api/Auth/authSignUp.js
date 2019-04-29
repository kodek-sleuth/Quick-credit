const express = require('express');

const authSignup = express.Router();
const userController = require('../Controllers/authControllerSignUp');
const image = require('../Settings/image');

authSignup.post('/signup', image.upload.single('Image'), userController.createUser);

module.exports = authSignup;
