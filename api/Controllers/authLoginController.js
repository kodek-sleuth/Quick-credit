/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */

const jwt = require('jsonwebtoken');

const models = require('../Models/models');

exports.loginUser = (req, res, next) => {
  console.log(req.body.Email);
  if (req.body.Email == null || req.body.Password == null) {
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
      if (req.body.Email == user.Email && req.body.Password == user.Password) {
        const token = jwt.sign({
          Email: req.body.Email,
          Password: req.body.Password
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '4h'
        });

        res.status(200).json({
          Status: 200,
          Data: {
            Id: user.Id,
            Token: token,
            Email: req.body.Email,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            isAdmin: user.isAdmin,
            Address: user.Address,
            Status: user.Status
          },
          Success: 'User successfully logged in'
        });
      } else {
        res.status(401).json({
          Status: 401,
          Error: 'Invalid Email or Password'
        });
      }
    });
  }
};
