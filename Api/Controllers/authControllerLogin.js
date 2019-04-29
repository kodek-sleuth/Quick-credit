/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */

// Password Encryption Library
const bcrypt = require('bcrypt');

// Authorisation Token Generator Library
const jwt = require('jsonwebtoken');

// .Pool enables connection to Database
const DatabaseConnector = require('pg').Pool;

// Database Conectoion String
const connectionString = process.env.QUICK_CREDIT_DB;

// eslint-disable-next-line object-shorthand
const pool = new DatabaseConnector({ connectionString: connectionString });

exports.loginUser = (req, res, next) => {
    const checkQueryAdmin = `Select * from admin WHERE email='${req.body.Email}'`;

    if (req.body.isAdmin == 'False')
    {
        const checkQueryUser = `Select * from users WHERE email='${req.body.Email}'`;
        pool.query(checkQueryUser)
        .then((data) => {
            if (data.rows > 0)
            {
                bcrypt.compare(req.body.Password, data[0].password, (err, success) => {
                    if (err)
                    {
                        res.status(401).json({
                            Status: '401',
                            Error: 'Invalid Email or Password'
                        });
                    }

                    if (success)
                    {
                        const token = jwt.sign({
                            Email: data[0].email
                        },

                        process.env.QUICK_CREDIT_SK,
                        {
                            expiresIn: '2h'
                        });

                        res.status(200).json({
                            Status: 200,
                            Data: {
                                Fullname: data[0].fullname,
                                Email: data[0].email,
                                Address: data[0].Address,
                                Status: data[0].status
                            },
                            Success: 'User Has Successfully Logged In',
                            Token: token
                        });
                    }
                });
            }

            else
            {
                res.status(401).json({
                    Status: '401',
                    Error: 'Invalid Email or Password'
                });
            }
        })
        .catch((error) => {
            res.status(401).json({
                Status: 401,
                Error: 'Invalid Email or Password'
            });
        });
    }
};
