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

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.updateUserProfile = (req, res, next) => {
    if (req.body.Email)
    {
        pool.query("UPDATE users set email=''")
    }
};
