const express = require('express');

const auth = express.Router;
const userController = require('../Controllers/authController');

auth.post('/signup', userController.create_user);

module.exports = auth;
