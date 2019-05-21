/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

// Password Encryption Library
import bcrypt from 'bcrypt';

// Authorisation Token Generator Library
import jwt from 'jsonwebtoken';

// .Pool enables connection to Database
import pg from 'pg';

const Pool = pg.Pool;

// Database Conectoion String
const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString });

// A Login is just a database check to make sure that req.body matches  all values in database for that user
exports.loginUser = (req, res, next) => {
  console.log(req.body);
  const checkQueryUser = `Select * from users WHERE email='${req.body.Email}'`;
  pool.query(checkQueryUser)
    .then((data) => {
      const fetchedData = data.rows;

      if (data.rowCount > 0) {
        if (fetchedData[0].isadmin == 'False') {
          bcrypt.compare(req.body.Password, fetchedData[0].password, (error, success) => {
            if (error) {
              res.status(401).json({
                Status: '401',
                Error: 'Invalid Email or Password',
              });
            }

            if (success) {
              // We the Create a user token that user is going to use for Authentication of other routes
              // Token takes user details(any), Secret Key and an expiry

              const token = jwt.sign({
                id: fetchedData[0].id,
                Email: fetchedData[0].email,
                isAdmin: 'False'
              },

              process.env.SECRET_KEY,
              {
                expiresIn: '2h',
              });

              res.status(200).json({
                Status: 200,
                Data: {
                  Firstname: fetchedData[0].firstname,
                  Lastname: fetchedData[0].lastname,
                  Email: fetchedData[0].email,
                  Address: fetchedData[0].address,
                  Token: token,
                  Status: fetchedData[0].status,
                  isAdmin: fetchedData[0].isadmin,
                },
                Message: 'User has successfully logged in',
              });
            }
          });
        } else {
          bcrypt.compare(req.body.Password, fetchedData[0].password, (error, success) => {
            if (error) {
              res.status(401).json({
                Status: '401',
                Message: 'Invalid Email or Password',
              });
            }

            if (success) {
              // We the Create a user token that user is going to use for Authentication of other routes
              // Token takes user details(any), Secret Key and an expiry

              const token = jwt.sign({
                id: fetchedData[0].id,
                Email: fetchedData[0].email,
                isAdmin: 'False'
              },

              process.env.SECRET_KEY,
              {
                expiresIn: '2h',
              });

              res.status(200).json({
                Status: 200,
                Data: {
                  Firstname: fetchedData[0].firstname,
                  Lastname: fetchedData[0].lastname,
                  Email: fetchedData[0].email,
                  Token: token,
                  isAdmin: fetchedData[0].isadmin,
                },
                Message: 'Admin has successfully logged in',
              });
            }
          });
        }
      } else {
        res.status(401).json({
          Status: '401',
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
