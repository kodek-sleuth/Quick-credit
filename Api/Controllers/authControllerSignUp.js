/* eslint-disable object-shorthand */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import config from '../../config';

import model from './databaseController';

exports.createUser = (req, res, next) => {
  const dataBaseQueryUser = 'INSERT INTO users(firstname, lastname, email, password, address, isAdmin) VALUES($1, $2, $3, $4, $5, $6)';

  model.pool.query(`Select * FROM users WHERE email='${req.body.Email}'`)
    .then((dataCheck1) => {
      if (dataCheck1.rows == 0) {
        bcrypt.hash(req.body.Password, 10, (err, hash) => {
          if (err) {
            res.status(401).json({
              Status: '401',
              Error: err,
            });
          } else {
            const token = jwt.sign({
              Email: req.body.Email,
              isAdmin: req.body.isAdmin,
            }, config.secret, { expiresIn: '5hr' });

            const valuesToDatabaseUser = [req.body.Firstname, req.body.Lastname, req.body.Email, hash, req.body.Address, req.body.isAdmin];
            model.pool.query(dataBaseQueryUser, valuesToDatabaseUser)
              .then((result) => {
                res.status(201).json({
                  Status: 201,
                  Data: {
                    Firstname: req.body.Firstname,
                    Lastname: req.body.Lastname,
                    Token: token,
                    Email: req.body.Email,
                    isAdmin: req.body.isAdmin,
                    Address: req.body.Address,
                    Status: 'Pending',
                  },
                  Message: 'User has successfully signed up',
                });
              })
              .catch((error) => {
                res.status(409).json({
                  Status: 409,
                  Message: error.message,
                });
              });
          }
        });
      } else {
        res.status(409).json({
          Status: 409,
          Message: 'Email is already taken',
        });
      }
    })
    .catch((dataError) => {
      res.status(400).json({
        Status: 400,
        Message: dataError.message,
      });
    });
};
