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

// Object That creates a connection to Postgres Server Instance
const Pool = require('pg').Pool;

// Object that defines db Properties
const connectionString = process.env.QUICK_CREDIT_DB_TEST;

// Creating a connection with connection string
const pool = new Pool({ connectionString: connectionString });

exports.createTableLoan = () => {
    pool.query("CREATE TABLE IF NOT EXISTS loan(id SERIAL PRIMARY KEY, investee_email VARCHAR(30) NOT NULL, investee_name VARCHAR(30) NOT NULL, createdOn TEXT NoT NULL, repaid TEXT NOT NULL DEFAULT('False'), status TEXT NOT NULL DEFAULT('Pending'), tenor INTEGER NOT NULL, amount numeric(10, 2) not null, paymentInstallment numeric(10, 2) not null, balance numeric(10, 2) not null, interest numeric(10, 2) not null")
    .then((feedback) => {
        console.log(feedback);
        pool.end();
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.createTableRepayment = () => {
    pool.query('CREATE TABLE IF NOT EXISTS repayments(id SERIAL PRIMARY KEY, loanId INTEGER REFERENCES repayments(id), investee_email VARCHAR(30) NOT NULL, investee_name VARCHAR(30) NOT NULL, createdOn TEXT NOT NULL, amount numeric(10, 2) not null, monthlyInstallment numeric(10, 2)not null')
    .then((feedback) => {
        console.log(feedback);
        pool.end();
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.createTableUser = () => {
    pool.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, fullname TEXT NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password TEXT NOT NULL, address TEXT NOT NULL, status VARCHAR(20) NOT NULL DEFAULT('Pending'), isAdmin VARCHAR(10) NOT NULL,image TEXT NOT NULL")
    .then((feedback) => {
        console.log(feedback);
        pool.end();
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.createTableAdmin = () => {
    pool.query('CREATE TABLE IF NOT EXISTS admin(id SERIAL PRIMARY KEY, fullname TEXT NOT NULL UNIQUE, email VARCHAR(30) NOT NULL UNIQUE, password TEXT NOT NULL, isAdmin VARCHAR(10) NOT NULL, image TEXT NOT NULL')
    .then((feedback) => {
        console.log(feedback);
        pool.end();
    })
    .catch((error) => {
        console.log(error);
    });
};
