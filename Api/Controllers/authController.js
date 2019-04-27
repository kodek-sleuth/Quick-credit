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

exports.createUser = (req, res, next) => {
    const valuesToDatabase = [req.body.Fullname, req.body.Email, req.body.Password, req.body.Address, req.body.Status, req.body.isAdmin, req.file.path];
    const dataBaseQuery = 'INSERT INTO users(fullname, email, password, address, status, isAdmin, image) VALUES($1, $2, $3, $4, $5, $6, $7)';
    
    pool.query(`Select * FROM users WHERE '${req.body.Email}'`)
    .then((dataCheck1) => {
        if (dataCheck1.rows == 0)
        {
            pool.query(`Select * FROM users WHERE '${req.body.Fullname}'`)
            .then((dataCheck2) => {
                if (dataCheck2.rows == 0)
                {
                    pool.query(dataBaseQuery, valuesToDatabase)
                    .then((result) => {
                        console.log(result);
                        res.status.json({
                            Status: '401',
                            Data: result
                        });
                    })
                    .catch((error) => {
                        res.status(401).json({
                            Status: '401',
                            Error: error
                        });
                    });
                }

                else 
                {
                    res.status(401).json({
                        Status: '401',
                        Error: 'Name is already taken'
                    });
                }
            })
            .catch((dataErrorName) => {
                res.status(401).json({
                    Status: '401',
                    Error: dataErrorName
                });
            });
        }

        else
        {
            res.status(401).json({
                Status: '401',
                Error: 'Email is already taken'
            });
        }
    })
    .catch((dataError) => {
        res.status(401).json({
            Status: '401',
            Error: dataError
        });
    });
};
