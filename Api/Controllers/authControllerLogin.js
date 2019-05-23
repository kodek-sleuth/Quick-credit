/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import model from './databaseController';

import config from '../../config';

import validators from './validations';

// A Login is just a database check to make sure that req.body matches  all values in database for that user
exports.loginUser = (req, res, next) => {
  const validate = validators.validateLogin(req.body);

  if (validate.error) {
    return res.status(400).json(
      {
        status: 400,
        validate: validate.error.details[0].context.label
      }
    );
  }
  const checkQueryUser = `Select * from users WHERE email='${req.body.Email}'`;
  model.pool.query(checkQueryUser)
    .then((data) => {
      const [fetchedData] = data.rows;

      if (data.rowCount > 0) {
        if (fetchedData.isadmin == 'False') {
          bcrypt.compare(req.body.Password, fetchedData.password, (error, success) => {
            if (error) {
              res.status(401).json({
                Status: 401,
                Error: 'Invalid Email or Password',
              });
            }

            if (success) {
              const token = jwt.sign({
                id: fetchedData.id,
                Email: fetchedData.email,
                isAdmin: 'False'
              },

              config.secret,
              {
                expiresIn: '24h',
              });

              res.status(200).json({
                Status: 200,
                Data: {
                  Firstname: fetchedData.firstname,
                  Lastname: fetchedData.lastname,
                  Email: fetchedData.email,
                  Address: fetchedData.address,
                  Token: token,
                  Status: fetchedData.status,
                  isAdmin: fetchedData.isadmin,
                },
                Message: 'User has successfully logged in',
              });
            }
          });
        } else {
          bcrypt.compare(req.body.Password, fetchedData.password, (error, success) => {
            if (error) {
              res.status(401).json({
                Status: 401,
                Message: 'Invalid Email or Password',
              });
            }

            if (success) {
              // We the Create a user token that user is going to use for Authentication of other routes
              // Token takes user details(any), Secret Key and an expiry

              const token = jwt.sign({
                id: fetchedData.id,
                Email: fetchedData.email,
                isAdmin: 'False'
              },

              config.secret,
              {
                expiresIn: '24h',
              });

              res.status(200).json({
                Status: 200,
                Data: {
                  Firstname: fetchedData.firstname,
                  Lastname: fetchedData.lastname,
                  Email: fetchedData.email,
                  Token: token,
                  isAdmin: fetchedData.isadmin,
                },
                Message: 'Admin has successfully logged in',
              });
            }
          });
        }
      } else {
        res.status(401).json({
          Status: 401,
          Message: 'Invalid Email or Password',
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        Status: 401,
        Message: error.message,
      });
    });
};
