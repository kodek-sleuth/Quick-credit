const express = require('express');

const authLogin = express.Router();
const userController = require('../Controllers/authControllerLogin');


authLogin.post('/login', userController.loginUser);

module.exports = authLogin;
