/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable max-len */

import express from 'express';

import bodyParser from 'body-parser';

import morgan from 'morgan';

import cors from 'cors';

// Library that generates the UI/UX of swagger
import swaggerUI from 'swagger-ui-express';

import authSignup from '../api/Auth/signup';

import login from '../api/Auth/login';

import applyLoan from '../api/Loans/applyLoan';

import repayLoan from '../api/Loans/repayLoan';

import verifyUser from '../api/Loans/userVerification';

import verifyLoan from '../api/Loans/loanVerifications';

import userHistory from '../api/users/history';

import loans from '../api/Loans/adminLoans';

import transac from '../api/Loans/transac';

import swagger from '../api/Settings/swagger';

const app = express();

app.use(cors());

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
app.use('/api/v1/auth', login);
app.use('/api/v1/user', applyLoan);
app.use('/api/v1/user', repayLoan);
app.use('/api/v1/admin', verifyUser);
app.use('/api/v1/admin', verifyLoan);
app.use('/api/v1/admin', loans);
app.use('/api/v1/user', userHistory);
app.use('/api/v1/admin', transac);

// Error Handling Where we create a new error object that gets sent on after error display Message Status
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    // Sending The error object to be sent and displayed back to User/Console 
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    // Displaying The Error Message To User/Console
    res.status(error.status || 500);
});

module.exports = app;
