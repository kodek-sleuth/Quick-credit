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
*           Tenor:
*             type: integer
*             example: 5
*           Amount:
*             type: integer
*             example: 500000
*         required:
*           - Tenor
*           - Amount
*     responses:
*       201:
*         description: Successfully applied for loan
*       400:
*         description: Failed To Authenticate
*/

reqLoan.post('/loans/apply', reqLoanController.applyLoan);

module.exports = reqLoan;
