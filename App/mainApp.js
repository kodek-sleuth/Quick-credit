/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable max-len */

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

const cors = require('cors');

app.use(cors());

// Library that generates the UI/UX of swagger
const swaggerUI = require('swagger-ui-express');

const authSignup = require('../Api/Auth/authSignUp');
const authLogin = require('../Api/Auth/authLogin');
const verifyUser = require('../Api/Verifications/verifyUser');
const rejectUser = require('../Api/Verifications/rejectUser');
const reqLoan = require('../Api/Loans/applyLoan');
const repayLoan = require('../Api/Loans/repayLoan');
const approveLoan = require('../Api/Loans/approveLoan');
const posTransLoan = require('../Api/Loans/postTransaction');
const rejectLoan = require('../Api/Loans/rejectLoan');
const userLoans = require('../Api/Loans/userLoans');
const adminLoans = require('../Api/Loans/adminLoans');
const userProfile = require('../Api/Profiles/userProfile');
const adminProfile = require('../Api/Profiles/adminProfile');
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

app.use('/', swaggerUI.serve, swaggerUI.setup(swagger.swaggerSpec));

// Defining our routes.
app.use('/api/v1/auth', authSignup);
app.use('/api/v1/auth', authLogin);
app.use('/api/v1/admin', verifyUser);
app.use('/api/v1/admin', rejectUser);
app.use('/api/v1/user', reqLoan);
app.use('/api/v1/user', repayLoan);
app.use('/api/v1/admin', approveLoan);
app.use('/api/v1/admin', posTransLoan);
app.use('/api/v1/admin', rejectLoan);
app.use('/api/v1/user', userLoans);
app.use('/api/v1/admin', adminLoans);
app.use('/api/v1/user', userProfile);
app.use('/api/v1/admin', adminProfile);

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
