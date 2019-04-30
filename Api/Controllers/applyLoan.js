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

const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.applyLoan = (req, res, next) => {
    const queryReqLoan = 'INSERT INTO loan(investee_email, investee_name, createdOn, tenor, amount, paymentInstallment, balance, interest) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

    const queryReqValues = [req.body.Email, req.body.Fullname, currentDate, req.body.tenor, req.body.amount, paymentInstallment, balance, interest];

    pool.query(`Select * from users WHERE email='${req.body.Email}' and fullname='${req.body.Fullname}'`)
    .then((data) => {
        if (data.rowCount > 0)
        {
            const dataFetched = data.rows;
            if (dataFetched[0].status == 'Verified')
            {
                pool.query(`Select * from loan WHERE investee_email='${req.body.Email}' and investee_name='${req.body.Fullname}'`)
            }

            else
            {
                res.status(401).json({
                    Status: '401',
                    Error: 'User must be Verified To make this request'
                });
            }
        }

        else
        {
            res.status(401).json({
                Status: '401',
                Error: 'Failed to process request, Try agian later'
            });
        }
    })
    .catch((error) => {
        res.status(401).json({
            Status: '401',
            Error: error.message
        });
    });
};
