/* eslint-disable comma-dangle */


exports.loans = [{
  LoanId: 99,
  Email: 'kelvin@gmail.com',
  Amount: 300000.0,
  Tenor: 5,
  Balance: 24030.0,
  Interest: 30000,
  MonthlyInstallment: 28999,
  Repaid: 'False',
  Status: 'Verified',
  CreatedOn: '21-05-2019'
},
{
  LoanId: 92,
  Email: 'selvin@gmail.com',
  Amount: 300000.0,
  Tenor: 5,
  Balance: 0,
  Interest: 30000,
  MonthlyInstallment: 28999,
  Repaid: 'True',
  Status: 'Verified',
  CreatedOn: '21-05-2019'
},
{
  LoanId: 93,
  Email: 'melvin@gmail.com',
  Amount: 300000.0,
  Tenor: 5,
  Balance: 250000.0,
  Interest: 30000,
  MonthlyInstallment: 28999,
  Repaid: 'False',
  Status: 'Verified',
  CreatedOn: '21-05-2019'
}];

exports.users = [{
  Id: 93,
  Firstname: 'Kelvin',
  Lastname: 'Tindeyebwa',
  Email: 'kelvin@gmail.com',
  Password: 'stealth',
  Status: 'Verified',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe'
}
];

exports.repayments = [{
  Id: 1,
  LoanId: 93,
  Email: 'melvin@gmail.com',
  Amount: 25000,
  PaidAmount: 10000,
  MonthlyInstallment: 28999,
  CreatedOn: '21-05-2019'
}];
