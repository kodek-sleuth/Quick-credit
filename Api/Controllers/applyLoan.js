/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;

const connectionString = process.env.QUICK_CREDIT_DB;

const pool = new Pool({ connectionString: connectionString });

exports.applyLoan = (req, res, next) => {

};