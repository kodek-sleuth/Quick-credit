/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */

const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.verifyUser = (req, res, next) => {
    const Email = req.param.Email;

    const verifyUserQuery = `Update users SET status='Verified' where email='${Email}'`;

    pool.query(verifyUserQuery)
    .then((result) => {
        res.status(200).json({
            Status: 200,
            Data: result,
            Success: 'Successfully Verified User'
        }); 
    });
};
