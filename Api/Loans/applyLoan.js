import express from 'express';

import reqLoanController from '../Controllers/applyLoanController';

const reqLoan = express.Router();

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
*           Fullname:
*             type: string
*             example: Mugerwa Joseph
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
*           - FullName
*           - Email
*           - Tenor
*           - Amount
*     responses:
*       201:
*         description: Customer Successfully Signed Up
*       500:
*         description: Failed To Authenticate
*/

reqLoan.post('/loans/apply', reqLoanController.applyLoan);

module.exports = reqLoan;
