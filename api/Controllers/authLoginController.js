/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const models = require('../Models/models');

exports.loginUser = (req, res, next) => {
  if (req.body.isAdmin == 'False') {
    if (req.body.Email == null || req.body.Email == '' && req.body.Password == null || req.body.Password == '') {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Password fields are required'
      });
    }

    if (isNaN(req.body.Email) == false) {
      res.status(400).json({
        Status: 400,
        Error: 'Email cannot be Integer'
      });
    } else {
      models.users.forEach((user) => {
        if (user.Email == req.body.Email && user.Password == req.body.Password) {
          res.status(200).json({
            Status: 200,
            Data: {
              Email: user.Email,
              Firstname: user.Fullname,
              Lastname: user.Lastname,
              Password: user.Password,
              isAdmin: user.isAdmin,
              Address: user.Address,
              Status: user.Status
            },
            Success: 'User successfully logged up'
          });
        } else {
          res.status(401).json({
            Status: 401,
            Error: 'Invalid Email or Password'
          });
        }
      });
    }
  }
};
