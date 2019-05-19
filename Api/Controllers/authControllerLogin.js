/* eslint-disable object-shorthand */
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


const pool = new DatabaseConnector({ connectionString: connectionString });

// A Login is just a database check to make sure that req.body matches  all values in database for that user
exports.loginUser = (req, res, next) => {
    const checkQueryAdmin = `Select * from admin WHERE email='${req.body.Email}'`;

    // Since Admin and User use one route for login in this Database
    // This field enables us filter out who is Admin and who is not

    if (req.body.isAdmin == 'False')
    {
        // We first check if the Email exists
        const checkQueryUser = `Select * from users WHERE email='${req.body.Email}'`;
        pool.query(checkQueryUser)
        .then((data) => {
            if (data.rowCount > 0)
            {
                // We check if the Password matches the hashed Password in db if decrypted
                const fetchedData = data.rows;
                bcrypt.compare(req.body.Password, fetchedData[0].password, (error, success) => {
                    if (error)
                    {
                        console.log(error);
                        res.status(401).json({
                            Status: '401',
                            Error: 'Invalid Email or Password'
                        });
                    }

                    if (success)
                    {
                        // We the Create a user token that user is going to use for Authentication of other routes
                        // Token takes user details(any), Secret Key and an expiry
                        
                        const token = jwt.sign({
                            Email: fetchedData[0].email,
                            isAdmin: 'False'
                        },

                        process.env.SECRET_KEY,
                        {
                            expiresIn: '2h'
                        });

                        res.status(200).json({
                            Status: 200,
                            Data: {
                                Firstname: fetchedData[0].firstname,
                                Lastname: fetchedData[0].lastname,
                                Email: fetchedData[0].email,
                                Address: fetchedData[0].address,
                                Token: token,
                                Status: fetchedData[0].status
                            },
                            Success: 'User Has Successfully Logged In'
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

    if (req.body.isAdmin == 'True')
    {
        pool.query(checkQueryAdmin)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const fetchedData = data.rows;
                bcrypt.compare(req.body.Password, fetchedData[0].password, (error, success) => {
                    if (error)
                    {
                        res.status(401).json({
                            Status: '401',
                            Error: error.message
                        });
                    }

                    if (success)
                    {
                        const token = jwt.sign({
                            Email: fetchedData[0].email,
                            isAdmin: 'True'
                        },

                        process.env.SECRET_KEY,
                        {
                            expiresIn: '2h'
                        });

                        res.status(200).json({
                            Status: 200,
                            Data: {
                                Firstname: fetchedData[0].firstname,
                                Lastname: fetchedData[0].lastname,
                                Email: fetchedData[0].email,
                                Token: token
                            },
                            Success: 'Admin Has Successfully Logged In'
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
