const express = require('express');

const postTransLoan = express.Router();

const jwtMiddleware = require('../Settings/checkAuthAdmin');

const postTransLoanController = require('../Controllers/adminPostTransactionController');

/**
* @swagger
* /api/v1/admin/loans/{:loanId}/transact:
*   patch:
*     security:
*        - bearerAuth: []
*     tags:
*       - Admin
*     name: Admin Post Transaction for user
*     summary: Admin Post Transaction for user
*     parameters:
*       - name: ":loanId"
*         in: path
*         description: Id of Loan
*         required: true
*         type: integer
*     responses:
*       200:
*         description: Successfully Placed Transaction for User
*/

postTransLoan.patch('/loans/:loanId/transact', jwtMiddleware, postTransLoanController.postTransaction);

module.exports = postTransLoan;
