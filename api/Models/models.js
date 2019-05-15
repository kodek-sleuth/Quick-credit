/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */

const jwt = require('jsonwebtoken');
class User {
  constructor() {
    this.users = [
      {
        Firstname: 'Marv',
        Lastname: 'Tindeyebwa',
        Email: 'marv@gmail.com',
        Password: 'stealth',
        isAdmin: 'False',
        Address: 'Kitende, Entebbe'
      }];
  }

  validateUserdata(data, res) {
    if (data.Email == null || data.Password == null || data.Firstname == null || data.Lastname == null || data.isAdmin == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Firstname, Lastname, Password fields are required'
      });
    } else {
      this.users.forEach((userr) => {
        if (data.Email === userr.Email) {
          res.status(400).json({
            Status: 400,
            Error: 'Email is already taken'
          });
        }
      });

      const id = Math.floor((Math.random() * 10) + 1);

      const token = jwt.sign({
        Email: data.Email,
        Firstname: data.Firstname,
        Lastname: data.Lastname
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '4h'
      });

      const newUser2 = {
        Id: id,
        Email: data.Email,
        Password: data.Password,
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        isAdmin: data.isAdmin,
        Address: data.Address,
        Status: 'Pending',
        Token: token
      };

      this.users.push(newUser2);

      const newObject = {
        Id: id,
        Email: data.Email,
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        isAdmin: data.isAdmin,
        Address: data.Address,
        Status: 'Pending',
        Token: token
      };

      return newObject;
    }
  }

  loginUser(data, res) {
    if (data.Email == null || data.Password == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Password fields are required'
      });
    } else {
      this.users.forEach((user) => {
        if (data.Email == user.Email && data.Password == user.Password) {
          const token = jwt.sign({
            Email: data.Email,
            Password: data.Password
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '4h'
          });

          const newObject2 = {
            Id: user.Id,
            Token: token,
            Email: data.Email,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            isAdmin: user.isAdmin,
            Address: user.Address,
            Status: user.Status
          };
          res.status(200).json({
            Success: 'User successfully logged in',
            Data: newObject2,
            Status: 200
          });
        } else {
          res.status(401).json({
            Status: 401,
            Error: 'Invalid Email or Password'
          });
        }
      });
    }
  }
}

class Loan {
  constructor() {
    this.loans = [
      {
        Id: 2,
        Email: 'marv@gmail.com',
        Amount: 200000,
        Tenor: 4,
        Balance: 200000,
        Interest: 16000,
        MonthlyInstallment: 25000,
        Repaid: 'False',
        Status: 'Verified',
        CreatedOn: '27-5-2019'
      },
    ];

    this.userss = [
      {
        Firstname: 'Marv',
        Lastname: 'Tindeyebwa',
        Email: 'marv@gmail.com',
        Password: 'stealth',
        isAdmin: 'True',
        Address: 'Kitende, Entebbe'
      },
    ];
  }

  validateLoanApplication(data, res) {
    if (data.Email == null || data.Amount == null || data.Tenor == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Amount and Tenor fields are required'
      });
    }

    this.userss.forEach((user) => {
      if (user.Email !== data.Email) {
        res.status(400).json({
          Status: 400,
          Error: 'Please Signup to apply for loan'
        });
      }
    });

    if (data.Tenor > 12) {
      res.status(400).json({
        Status: 400,
        Error: 'Tenor must be less than 12 monthns'
      });
    }

    this.userss.forEach((user) => {
      if (user.Email == data.Email) {
        if (user.isAdmin == 'True') {
          res.status(400).json({
            Status: 400,
            Error: 'Admin cannot apply for loan'
          });
        }
      }
    });

    this.loans.forEach((loan) => {
      if (loan.Email == data.Email && loan.Repaid == 'False') {
        res.status(400).json({
          Status: 400,
          Error: 'User must repay old loan to apply for new loan'
        });
      }
    });

    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const interest = (5 * data.Amount) / 100;
    const paymentInstallment = (data.Amount + interest) / data.Tenor;
    const balance = data.Amount + interest;
    const id = Math.floor((Math.random() * 10) + 1);

    const newLoan = {
      Id: id,
      Email: data.Email,
      Amount: data.Amount,
      Tenor: data.Tenor,
      Balance: balance,
      Interest: interest,
      MonthlyInstallment: paymentInstallment,
      Repaid: 'False',
      Status: 'Pending',
      CreatedOn: currentDate
    };

    this.loans.push(newLoan);

    return newLoan;
  }

  showLoans(status, repaid, res) {
    this.loans.forEach((loan) => {
      if (loan.status == 'Approved' && loan.Repaid == 'True') {
        const newObject = loan;
      }
    });
  }
}

class Repayment {
  constructor() {
    this.loans = [
      {
        Id: 2,
        Email: 'marv@gmail.com',
        Amount: 200000,
        Tenor: 4,
        Balance: 200000,
        Interest: 16000,
        MonthlyInstallment: 25000,
        Repaid: 'False',
        Status: 'Verified',
        CreatedOn: '27-5-2019'
      }
    ];

    this.repayments = [];
  }

  validateRepayment(data, res, loanId) {
    if (data.Email == null || data.Amount == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Amount fields are required'
      });
    }

    this.loans.forEach((loan) => {
      if (loan.Id != loanId) {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that Id does not exist'
        });
      }

      if (data.Amount > loan.Balance) {
        res.status(400).json({
          Status: 400,
          Error: `Please pay exact balance of ${loan.Balance}`
        });
      }

      if (loan.Status !== 'Verified') {
        res.status(400).json({
          Status: 400,
          Error: 'Loan has to be verified inorder to repay it'
        });
      }

      if (loan.Repaid == 'True') {
        res.status(400).json({
          Status: 400,
          Error: 'Loan has been already been repaid'
        });
      }
    });

    const id = Math.floor((Math.random() * 10) + 1);
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    this.loans.forEach((loan) => {
      if (loan.Id == loanId) {
        const newBalance = loan.Balance - data.Amount;
        loan.Balance = newBalance;
      }
    });

    const newRepayment = {
      Id: id,
      LoanId: loanId,
      Email: data.Email,
      PaidAmount: data.Amount,
      CreatedOn: currentDate
    };

    this.repayments.push(newRepayment);

    return newRepayment;
  }
}

module.exports = {
  User,
  Loan,
  Repayment
};
