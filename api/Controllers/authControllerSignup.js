/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable comma-dangle */

const jwt = require('jsonwebtoken');

const models = require('../Models/models');

exports.signUpUser = (req, res, next) => {
  if (req.body.Email == null || req.body.Password == null || req.body.Firstname == null || req.body.Lastname || req.body.isAdmin == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, firstname, lastname, Password and Address fields are required'
      });
    } 

    if (isNaN(req.body.Email) == false || isNaN(req.body.Firstname) == false || isNaN(req.body.Lastname) == false)
    {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Firstname and Lastname cannot be Integer'
      });
    }

    else {
      models.users.forEach((user) => {
        if (user.Email == req.body.Email) {
          res.status(400).json({
            Status: 400,
            Error: 'Email is already taken'
          });
        }
      });
          
      const newUser2 = {
        Email: req.body.Email,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Password: req.body.Password,
        isAdmin: req.body.isAdmin,
        Address: req.body.Address,
        Status: 'Pending'
      };   

      models.users.push(newUser2);

      const token = jwt.sign({
        Email: req.body.Email,
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname
      },
       process.env.SECRET_KEY,
      {
        expiresIn: '4h'
      });

      res.status(201).json({
        Status: 201,
        Data: {
          Email: req.body.Email,
          Firstname: req.body.Firstname,
          Lastname: req.body.Lastname,
          isAdmin: req.body.isAdmin,
          Address: req.body.Address,
          Status: 'Pending'
        },
        Token: token,
        Success: 'User successfully signed up' 
      });
    }
};
