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

// .Pool enables connection to Database
const DatabaseConnector = require('pg').Pool;

// Database Conectoion String
const connectionString = process.env.QUICK_CREDIT_DB;

// eslint-disable-next-line object-shorthand
const pool = new DatabaseConnector({ connectionString: connectionString });

exports.createUser = (req, res, next) => {
    const dataBaseQueryAdmin = 'INSERT INTO admin(fullname, email, password, isAdmin, image) VALUES($1, $2, $3, $4, $5)';
    
    const dataBaseQueryUser = 'INSERT INTO users(fullname, email, password, address, isAdmin, image) VALUES($1, $2, $3, $4, $5, $6)';
    
    console.log(req.body.isAdmin);
    
    if (req.body.isAdmin == 'False')
    {
        pool.query(`Select * FROM users WHERE email='${req.body.Email}'`)
        .then((dataCheck1) => {
            if (dataCheck1.rows == 0)
            {
                pool.query(`Select * FROM users WHERE fullname='${req.body.Fullname}'`)
                .then((dataCheck2) => {
                    if (dataCheck2.rows == 0)
                    {
                        bcrypt.hash(req.body.Password, 10, (err, hash) => {
                            if (err)
                            {
                                res.status(401).json({
                                    Status: '401',
                                    Error: err.message
                                });
                            }

                            else
                            {
                                const valuesToDatabaseUser = [req.body.Fullname, req.body.Email, hash, req.body.Address, req.body.isAdmin, req.file.path];
                                pool.query(dataBaseQueryUser, valuesToDatabaseUser)
                                .then((result) => {
                                    console.log(result);
                                    res.status(201).json({
                                        Status: '201',
                                        Data: {
                                            Fullname: req.body.Fullname,
                                            Email: req.body.Email,
                                            Password: hash,
                                            isAdmin: req.body.isAdmin,
                                            Address: req.body.Address,
                                            Image: req.file.path
                                        },
                                        Success: 'User Has Successfully Signed Up'
                                    });
                                })
                                .catch((error) => {
                                    res.status(401).json({
                                        Status: '401',
                                        Error: error.message
                                    });
                                });
                            }
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
                        Error: dataErrorName.message
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
    }

    if (req.body.isAdmin == 'True')
    {
        pool.query(`Select * FROM admin WHERE email='${req.body.Email}'`)
        .then((dataCheck1) => {
            if (dataCheck1.rows == 0)
            {
                pool.query(`Select * FROM admin WHERE fullname='${req.body.Fullname}'`)
                .then((dataCheck2) => {
                    if (dataCheck2.rows == 0)
                    {
                        bcrypt.hash(req.body.Password, 10, (err, hash) => {
                            if (err)
                            {
                                res.status(401).json({
                                    Status: '401',
                                    Error: err.message
                                });
                            }

                            else {
                                const valuesToDatabaseAdmin = [req.body.Fullname, req.body.Email, hash, req.body.isAdmin, req.file.path];
                                pool.query(dataBaseQueryAdmin, valuesToDatabaseAdmin)
                                .then((result) => {
                                    console.log(result);
                                    res.status(201).json({
                                        Status: '201',
                                        Data: {
                                            Fullname: req.body.Fullname,
                                            Email: req.body.Email,
                                            Password: hash,
                                            isAdmin: req.body.isAdmin,
                                            Image: req.file.path
                                        },
                                        Success: 'Admin Has Successfully Signed Up'
                                    });
                                })
                                .catch((error) => {
                                    res.status(401).json({
                                        Status: '401',
                                        Error: error
                                    });
                                });
                            }
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
    } 
};
