/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */

const Pool = require('pg').Pool;

const bcrypt = require('bcrypt');

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.getUserProfile = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from users WHERE email='${Email}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const fetchedData2 = data.rows;
            res.status(200).json({
                Status: 200,
                Data: fetchedData2
            });
        }

        else
        {
            res.status(200).json({
                Count: data.rowCount,
                Status: 200,
                Success: 'No user exists with that email'
            });
        }
    })

    .catch((error) => {
        res.status(500).json({
            Status: 500,
            Error: error.message 
        });
    });
};

exports.updateUserProfile = (req, res, next) => {
    const email = req.params.Email;

    if (req.body.Fullname)
    {
        pool.query(`UPDATE users set fullname='${req.body.Fullname}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from users where email='${email}'`)
            .then((feedBack2) => {
                res.status(200);
            })
            .catch((error) => {
                res.status(500).json({
                    Status: 500,
                    Error: error.message
                });
            });
        })

        .catch((error) => {
            res.status(500).json({
                Status: 500,
                Error: error.message
            });
        });
    }

    if (req.body.OldPassword)
    {
        pool.query(`SELECT * FROM users where email='${email}'`, (errorFound2, result) => {
            if (errorFound2)
            {
                res.status(500).json({
                    Status: 500,
                    Error: errorFound2.message
                });
            }

            else
            {
                const fetchedData = result.rows;
                bcrypt.compare(req.body.OldPassword, fetchedData[0].password, (err, goodFeedBack) => {
                if (err)
                {
                    res.status(500).json({
                        Status: 500,
                        Error: err.message
                    });
                }

                else
                {
                    bcrypt.hash(req.body.NewPassword, 10, (errr, hash) => {
                        if (err)
                        {
                            res.status(500).json({
                                Status: 500,
                                Error: err.message
                            });
                        }

                        else
                        {
                            pool.query(`UPDATE users set password='${hash}' where email='${email}'`, (errorFound, feedBack) => {
                                if (errorFound)
                                {
                                    res.status(500).json({
                                        Status: 500,
                                        Error: errorFound
                                    });
                                }

                                else
                                {
                                    pool.query(`select * from users where email='${email}'`, (error, feedBack2) => {
                                        if (error)
                                        {
                                            res.status(500).json({
                                                Status: 500,
                                                Error: error.message
                                            });
                                        }
    
                                        else
                                        {
                                            res.status(200);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            }
        });
    }

    if (req.body.Address)
    {
        pool.query(`UPDATE users set address='${req.body.Address}' where email='${email}'`, (error, success) => {
            if (error)
            {
                res.status(500).json({
                    Status: 500,
                    Error: error.message
                });   
            }

            else
            {
                pool.query(`select * from users where email='${email}'`, (error2, success2) => {
                    if (error)
                    {
                        res.status(500).json({
                            Status: 500,
                            Error: error.message
                        });
                    }

                    else
                    {
                        res.status(200);
                    }
                });
            }
        });
    }

    if (req.body.Email)
    {
        pool.query(`UPDATE users set email='${req.body.Email}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from users where email='${email}'`)
            .then((feedBack2) => {
                res.status(200).json({
                    Status: 200,
                    Data: feedBack2.rows,
                    Success: 'Successfully Updated Profile'
                });
            })
            .catch((error) => {
                res.status(500).json({
                    Status: 500,
                    Error: error.message
                });
            });
        })

        .catch((error) => {
            res.status(500).json({
                Status: 500,
                Error: error.message
            });
        });
    }
};

exports.userUpdateProfilePicture = (req, res, next) => {
    if (req.file.path)
    {
        const email = req.params.Email;
        pool.query(`UPDATE users set image='${req.file.path}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from users where email='${email}'`, (err, success) => {
                if (err)
                {
                    res.status(500).json({
                        Status: 500,
                        Error: err.message
                    });
                }

                else
                {
                    res.status(200).json({
                        Status: 200,
                        Data: success.rows,
                        Success: 'Successfully Updated Profile'
                    });
                }
            });
        })

        .catch((error) => {
            res.status(500).json({
                Status: 500,
                Error: error.message
            });
        });
    }
};
