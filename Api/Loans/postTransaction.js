import express from 'express';

import postTransLoanController from '../Controllers/adminPostTransactionController';

const postTransLoan = express.Router();

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

postTransLoan.patch('/loans/:loanId/transact', postTransLoanController.postTransaction);

module.exports = postTransLoan;
