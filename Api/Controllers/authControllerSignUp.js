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

// Database Connection String
const connectionString = process.env.QUICK_CREDIT_DB;

// eslint-disable-next-line object-shorthand
const pool = new DatabaseConnector({ connectionString: connectionString });

exports.createUser = (req, res, next) => {
    // Database queriey to insert  req body in Database
    const dataBaseQueryAdmin = 'INSERT INTO admin(fullname, email, password, isAdmin, image) VALUES($1, $2, $3, $4, $5)';
    
    const dataBaseQueryUser = 'INSERT INTO users(fullname, email, password, address, isAdmin, image) VALUES($1, $2, $3, $4, $5, $6)';
    
    console.log(req.body);
    // We seperating who deserves to be admin and user
    if (req.body.isAdmin == 'False')
    {
        // We making sure that User/Admin does not login with an already users Email/Fullname
        pool.query(`Select * FROM users WHERE email='${req.body.Email}'`)
        .then((dataCheck1) => {
            if (dataCheck1.rows == 0)
            {
                pool.query(`Select * FROM users WHERE fullname='${req.body.Fullname}'`)
                .then((dataCheck2) => {
                    if (dataCheck2.rows == 0)
                    {
                        // We make sure that the Password stored is first hashed for Privacy and Protection 
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
                Error: dataError.message
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
                Error: dataError.message
            });
        });
    } 
};
