/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.verifyUser = (req, res, next) => {
  const userEmail = req.params.userEmail;

  const result = new models.User().verifyUser(userEmail, res);
};
