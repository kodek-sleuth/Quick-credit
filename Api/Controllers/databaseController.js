/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */

import pg from 'pg';

import config from '../../config';

const { Pool } = pg;

const { connectionString } = config;

const pool = new Pool({ connectionString });

const createTableLoan = () => {
  pool.query("CREATE TABLE IF NOT EXISTS loan(id SERIAL PRIMARY KEY, userid INTEGER REFERENCES users(id), createdOn TEXT NoT NULL, repaid BOOLEAN NOT NULL DEFAULT(false), status TEXT NOT NULL DEFAULT('Pending'), tenor INTEGER NOT NULL, amount numeric(10, 2) not null, paymentInstallment numeric(10, 2) not null, balance numeric(10, 2) not null, interest numeric(10, 2) not null")
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

const createTableRepayment = () => {
  pool.query('CREATE TABLE IF NOT EXISTS repayments(id SERIAL PRIMARY KEY, loanId INTEGER REFERENCES loan(id), createdOn TEXT NOT NULL, amount numeric(10, 2) not null, monthlyInstallment numeric(10, 2)not null')
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

const createTableUser = () => {
  pool.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL UNIQUE, password TEXT NOT NULL, address TEXT NOT NULL, status VARCHAR(20) NOT NULL DEFAULT('Pending'), isAdmin BOOLEAN NOT NULL")
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

const dropAdmin = () => {
  pool.query('Delete from admin')
    .then((feedback) => {
      pool.end();
    })
    .catch((error) => {
    });
};

module.exports = {
  pool
};
