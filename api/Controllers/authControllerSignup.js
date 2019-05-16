/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

import models from '../Models/models';

exports.signUpUser = (req, res, next) => {
  const result = new models.User().validateUserdata(req.body, res);
  res.status(201).json({
    Success: 'User successfully signed up',
    Data: result,
    Status: 201
  });
};
