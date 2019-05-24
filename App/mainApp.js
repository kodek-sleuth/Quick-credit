/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable max-len */

import express from 'express';

import bodyParser from 'body-parser';

import morgan from 'morgan';

import cors from 'cors';

import jwtMiddleware from '../Api/Settings/checkAuthAdmin';

import jwtMiddleware2 from '../Api/Settings/checkAuthUser';

import model from '../Api/Controllers/databaseController';

const app = express();

app.use(cors());

const createTableUser = () => {
    model.pool.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL UNIQUE, password TEXT NOT NULL, address TEXT NOT NULL, status VARCHAR(20) NOT NULL DEFAULT('Pending'), isAdmin BOOLEAN NOT NULL)");
  };
  createTableUser();

const createTableLoan = () => {
    model.pool.query("CREATE TABLE IF NOT EXISTS loan(id SERIAL PRIMARY KEY, userid INTEGER REFERENCES users(id), createdOn TEXT NoT NULL, repaid BOOLEAN NOT NULL DEFAULT(false), status TEXT NOT NULL DEFAULT('Pending'), tenor INTEGER NOT NULL, amount numeric(10, 2) not null, paymentInstallment numeric(10, 2) not null, balance numeric(10, 2) not null, interest numeric(10, 2) not null)");
  };
  createTableLoan();

const createTableRepayment = () => {
    model.pool.query('CREATE TABLE IF NOT EXISTS repayments(id SERIAL PRIMARY KEY, loanId INTEGER REFERENCES loan(id), createdOn TEXT NOT NULL, amount numeric(10, 2) not null, monthlyInstallment numeric(10, 2)not null)');
  };
  
createTableRepayment();

// Library that generates the UI/UX of swagger
const swaggerUI = require('swagger-ui-express');

const authSignup = require('../Api/Auth/authSignUp');
const authLogin = require('../Api/Auth/authLogin');
const verifyUser = require('../Api/Verifications/verifyUser');
const reqLoan = require('../Api/Loans/applyLoan');
const repayLoan = require('../Api/Loans/repayLoan');
const approveLoan = require('../Api/Loans/approveLoan');
const posTransLoan = require('../Api/Loans/postTransaction');
const rejectLoan = require('../Api/Loans/rejectLoan');
const userLoans = require('../Api/Loans/userLoans');
const adminLoans = require('../Api/Loans/adminLoans');
const swagger = require('../Api/Settings/swagger');

// Enable API to receive urlencoded data as well as json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// To tell express that uploads is a static folder 
app.use(express.static('uploads'));

app.get('/swagger.json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger.swaggerSpec);
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger.swaggerSpec));

// Defining our routes.
app.use('/api/v1/auth', authSignup);
app.use('/api/v1/auth', authLogin);
app.use('/api/v1/admin', jwtMiddleware, verifyUser);
app.use('/api/v1/user', jwtMiddleware2, reqLoan);
app.use('/api/v1/user', jwtMiddleware2, repayLoan);
app.use('/api/v1/admin', jwtMiddleware, approveLoan);
app.use('/api/v1/admin', jwtMiddleware, posTransLoan);
app.use('/api/v1/admin', jwtMiddleware, rejectLoan);
app.use('/api/v1/user', jwtMiddleware2, userLoans);
app.use('/api/v1/admin', jwtMiddleware, adminLoans);

// Error Handling Where we create a new error object that gets sent on after error display Message Status
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    // Sending The error object to be sent and displayed back to User/Console 
    next(error);
});

app.use((error, req, res, next) => {
    // Displaying The Error Message To User/Console
    res.status(error.status || 500);
    res.json({
        Error: error.message
    });
});

module.exports = app;
