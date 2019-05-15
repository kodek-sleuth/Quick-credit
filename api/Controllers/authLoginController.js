/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const jwt = require('jsonwebtoken');

const models = require('../Models/models');

exports.loginUser = (req, res, next) => {
  const result = new models.Loans().loginUser(req.body, res);
  res.status(200).json({
    Success: 'User successfully logged in',
    Data: result,
    Status: 200
  });
};
