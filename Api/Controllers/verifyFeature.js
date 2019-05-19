/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.verifyUser = (req, res, next) => {
    const Email = req.params.Email;

    const verifyUserQuery = `Update users SET status='Verified' where email='${Email}'`;

    pool.query(verifyUserQuery)
    .then((result) => {
        pool.query(`Select * from users where email='${Email}'`)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const dataFound = data.rows;
                res.status(200).json({
                    Status: 200,
                    Data: {
                        Firstname: dataFound[0].firstname,
                        Lastname: dataFound[0].lastname,
                        Email: dataFound[0].email,
                        Status: dataFound[0].status,
                        Address: dataFound[0].address
                    },
                    Success: 'Successfully Verified User'
                }); 
            }
        })
        .catch((error) => {
            res.status(500).json({
                Status: '500',
                Error: 'Failed to Fetch Results'
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            Status: '500',
            Error: 'Failed to Fetch Results'
        });
    });
};

exports.rejectUser = (req, res, next) => {
    const Email = req.params.Email;

    const rejectUserQuery = `Update users SET status='Rejected' where email='${Email}'`;

    pool.query(rejectUserQuery)
    .then((result) => {
        pool.query(`Select * from users where email='${Email}'`)
        .then((data) => {
            if (data.rowCount > 0)
            {
                const dataFound = data.rows;
                res.status(200).json({
                    Status: 200,
                    Data: {
                        Firstname: dataFound[0].firstname,
                        Lastname: dataFound[0].lastname,
                        Email: dataFound[0].email,
                        Status: dataFound[0].status,
                        Address: dataFound[0].address
                    },
                    Success: 'Successfully Rejected User'
                }); 
            }
        })
        .catch((error) => {
            res.status(500).json({
                Status: '500',
                Error: 'Failed to Update and Fetch'
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            Status: '500',
            Error: 'Failed to Update and Fetch'
        });
    });
};
