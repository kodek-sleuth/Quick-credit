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

const connectionString = process.env.QUICK_CREDIT_DB_TEST;

const pool = new Pool({ connectionString: connectionString });

// Function To fetch Admin Profile
exports.getAdminProfile = (req, res, next) => {
    const Email = req.params.Email;

    pool.query(`Select * from admin WHERE email='${Email}'`)
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

// Since Image object will be available everytime on submit 
// I want us to appreciate the fact that we only send a full object back to the user in the Image file meaning that Image file should be available in every request 
exports.updateAdminProfile = (req, res, next) => {
    const email = req.params.Email;

    // If Email Exists in FormBody then it should make update but this is not recommended
    if (req.body.Email)
    {
        pool.query(`UPDATE admin set email='${req.body.Email}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from admin where email='${email}'`)
            .then((feedBack2) => {
                console.log(feedBack2.rows);
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

    // Update Fullname if Fullname is available in req body
    if (req.body.Fullname)
    {
        pool.query(`UPDATE admin set fullname='${req.body.Fullname}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from admin where email='${email}'`)
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

    // We fast want to make sure that User has old Password which Password we test with bcrypt with the real in database
    // If they dont match it should throw an error else we encrypt and save the new one  

    if (req.body.OldPassword)
    {
        pool.query(`SELECT * FROM admin where email='${email}'`, (errorFound2, result) => {
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
                            pool.query(`UPDATE admin set password='${hash}' where email='${email}'`, (errorFound, feedBack) => {
                                if (errorFound)
                                {
                                    res.status(500).json({
                                        Status: 500,
                                        Error: errorFound
                                    });
                                }

                                else
                                {
                                    pool.query(`select * from admin where email='${email}'`, (error, feedBack2) => {
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

    // Image path
    if (req.file.path)
    {
        pool.query(`UPDATE admin set image='${req.file.path}' where email='${email}'`)
        .then((feedBack) => {
            pool.query(`select * from admin where email='${email}'`, (err, success) => {
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
