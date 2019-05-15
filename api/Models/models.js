/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
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
    }

    this.users.forEach((user) => {
      if (user.Email == data.Email) {
        res.status(400).json({
          Status: 400,
          Error: 'User with that Email/Names Exist'
        });
      }
    });

    if (data.Password.length < 6) {
      res.status(400).json({
        Status: 400,
        Error: 'Password should be 6 or more characters'
      });
    } else {
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

  verifyUser(emailId, res) {
    this.users.forEach((user) => {
      if (user.Email == emailId) {
         return user;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'User with tha Email does not exist'
        });
      }
    });
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
    // Checking whether user does not supply null data
    if (data.Email == null || data.Amount == null || data.Tenor == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email, Amount and Tenor fields are required'
      });
    }

    // Checking whether user does not supply a number for email and string for tenor and amount
    if (isNaN(data.Amount) == true && isNaN(data.Tenor) == true && isNaN(data.Email) == false) {
      res.status(400).json({
        Status: 400,
        Error: 'Amount and Tenor should be numbers only while Email is string'
      });
    }

    // Checking whether a user enters an apropriate email
    if (data.Email.length < 7) {
      res.status(400).json({
        Status: 400,
        Error: 'Email is too short'
      });
    }

    // Checking whether a user only borrows 5000 plus amount of money
    if (data.Amount < 5000) {
      res.status(400).json({
        Status: 400,
        Error: 'Amount should be greater than 4999 shillings'
      });
    }

    // Checking whether a user who applies for a loan is a user in db
    this.userss.forEach((user) => {
      if (user.Email !== data.Email) {
        res.status(400).json({
          Status: 400,
          Error: 'Please signup to apply for loan'
        });
      }
    });

    // Checking whether user has no unrepaid loan history before applying for a new one
    this.loans.forEach((loan) => {
      if (loan.Email == data.Email && loan.Repaid == 'False') {
        res.status(400).json({
          Status: 400,
          Error: 'User must repay old loan to apply for new loan'
        });
      }
    });

    // Finally enabling the user to apply for loan
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

  verifyLoan(loanId, res) {
    this.loans.forEach((loan) => {
      if (loan.Id == loanId) {
        loan.Status = 'Verified';
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'No loan exists with that Id'
        });
      }
    });
  }

  adminPostTransaction(loanId, res) {
    this.loans.forEach((loan) => {
      if (loan.Id == loanId) {
        loan.Status = 'Approved';
        loan.Balance = 0;
        loan.Repaid = 'True';
        return loan;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'No loan exists with that Id'
        });
      }
    });
  }

  rejectLoan(loanId, res) {
    this.loans.forEach((loan) => {
      if (loan.Id == loanId) {
        loan.Status = 'Rejected';
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'No loan exists with that Id'
        });
      }
    });
  }

  showRepaid(status, repaid, res) {
    this.loans.forEach((loan) => {
      if (loan.Status == status && loan.Repaid == repaid) {
        return loan;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'No loans exist with those parameters [Approved, True/False]'
        });
      }
    });
  }

  showUnRepaid(status, repaid, res) {
    this.loans.forEach((loan) => {
      if (loan.Status == repaid && loan.Repaid == status) {
        return loan;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'No loans exist with those parameters [Approved, True/False]'
        });
      }
    });
  }

  showAllLoans() {
    return this.loans;
  }

  getSpecific(loanId, res) {
    this.loans.forEach((loan) => {
      if (loan.Id == loanId) {
        return loan;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that Id does not exist'
        });
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
    // Checking whether user submits the required values
    if (data.Email == null || data.Amount == null) {
      res.status(400).json({
        Status: 400,
        Error: 'Email and Amount fields are required'
      });
    }

    // Checking whether user does not supply a number for email and string for amount
    if (isNaN(data.Amount) == true && isNaN(data.Email) == false) {
      res.status(400).json({
        Status: 400,
        Error: 'Amount and Tenor should be numbers only while Email is string'
      });
    }

    // Checking whether a user enters an apropriate email
    if (data.Email.length < 7) {
      res.status(400).json({
        Status: 400,
        Error: 'Email is too short'
      });
    }

    // Checking whether a user who repays for a loan is a user in db
    this.userss.forEach((user) => {
      if (user.Email !== data.Email) {
        res.status(400).json({
          Status: 400,
          Error: 'Please signup to repay loan'
        });
      }
    });

    this.loans.forEach((loan) => {
      // Checking whether loan with that Id exists in the database
      if (loan.Id != loanId) {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that Id does not exist'
        });
      }

      // Checking whether loan to repay is verified
      if (loan.Status !== 'Verified') {
        res.status(400).json({
          Status: 400,
          Error: 'Loan has to be verified inorder to repay it'
        });
      }

      // Checking whether loans to repay has already been repaid
      if (loan.Repaid == 'True') {
        res.status(400).json({
          Status: 400,
          Error: 'Loan has already been repaid'
        });
      }

      // Checking if user does not pay higher than his balance
      if (data.Amount > loan.Balance) {
        res.status(400).json({
          Status: 400,
          Error: `Please pay exact balance of ${loan.Balance}`
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

  getUserLoanHistory(loanId, res) {
    this.repayments.forEach((loan) => {
      if (loan.LoanId == loanId) {
        return loan;
      } else {
        res.status(400).json({
          Status: 400,
          Error: 'Loan with that Id does not exist'
        });
      }
    });
  }
}

module.exports = {
  User,
  Loan,
  Repayment
};
