/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const jwt = require('jsonwebtoken');

const models = require('../Models/models');

exports.signUpUser = (req, res, next) => {
  const body = new models.ModelClass(req.body, res);
  res.status(201).json({
    Success: 'User successfully signed up',
    Data: body,
    Status: 201
  });
};
