const express = require('express');

const auth = express.Router();
const userController = require('../Controllers/authController');
const image = require('../Settings/image');

auth.post('/signup', image.upload.single('Image'), userController.createUser);

module.exports = auth;
