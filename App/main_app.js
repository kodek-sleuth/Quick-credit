/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable max-len */

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authSignup = require('../Api/Auth/authSignUp');
const authLogin = require('../Api/Auth/authLogin');
const verifyUser = require('../Api/Verifications/verifyUser');

// Enable API to receive urlencoded data as well as json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// To tell express that uploads is a static folder 
app.use(express.static('uploads'));

// Defining our routes.
app.use('/auth', authSignup);
app.use('/auth', authLogin);
app.use('/user', verifyUser);

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
    res.json({
        // eslint-disable-next-line comma-dangle
        Error: error.message
    });
});

module.exports = app;
