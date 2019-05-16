/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

import models from '../Models/models';

exports.loginUser = (req, res, next) => {
  const result = new models.User().loginUser(req.body, res);
};
