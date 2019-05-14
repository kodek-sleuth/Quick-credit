const express = require('express');

const reqLoan = express.Router();

const reqLoanController = require('../Controllers/loanApplyController');

/**
* @swagger
* /api/v1/user/loans/apply:
*   post:
*     security:
*        - bearerAuth: []
*     tags:
*       - User
*     name: Apply for a Loan
*     summary: Apply for a Loan
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*             example: mugerwa@gmail.com
*           Tenor:
*             type: integer
*             example: 5
*           Amount:
*             type: integer
*             example: 500000
*         required:
*           - Email
*           - Tenor
*           - Amount
*     responses:
*       201:
*         description: Successfully Applied For Loan
*       500:
*         description: Failed To Authenticate
*/


reqLoan.post('/loans/apply', reqLoanController.applyLoan);

module.exports = reqLoan;
