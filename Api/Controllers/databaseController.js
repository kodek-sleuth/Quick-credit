/* eslint-disable no-unused-vars */

import pg from 'pg';

import config from '../../config';

const Pool = pg.Pool;

const connectionString = config.connectionString;

const key = config.jwt_key;

console.log(connectionString);

const pool = new Pool({ connectionString });

exports.createTableLoan = () => {
  pool.query("CREATE TABLE IF NOT EXISTS loan(id SERIAL PRIMARY KEY, NOT NULL, userid INTEGER REFERENCES users(id), createdOn TEXT NoT NULL, repaid TEXT NOT NULL DEFAULT('False'), status TEXT NOT NULL DEFAULT('Pending'), tenor INTEGER NOT NULL, amount numeric(10, 2) not null, paymentInstallment numeric(10, 2) not null, balance numeric(10, 2) not null, interest numeric(10, 2) not null")
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

exports.createTableRepayment = () => {
  pool.query('CREATE TABLE IF NOT EXISTS repayments(id SERIAL PRIMARY KEY, loanId INTEGER REFERENCES loan(id), createdOn TEXT NOT NULL, amount numeric(10, 2) not null, monthlyInstallment numeric(10, 2)not null')
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

exports.createTableUser = () => {
  pool.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL UNIQUE, password TEXT NOT NULL, address TEXT NOT NULL, status VARCHAR(20) NOT NULL DEFAULT('Pending'), isAdmin VARCHAR(10) NOT NULL")
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

exports.dropAdmin = () => {
  pool.query('Delete from admin')
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};
