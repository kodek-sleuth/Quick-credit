/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */

exports.ModelClass = class User {
  constructor() {
    this.users = [{
      Id: 93,
      Firstname: 'Kelvin',
      Lastname: 'Tindeyebwa',
      Email: 'kelvin@gmail.com',
      Password: 'stealth',
      Status: 'Verified',
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
        if (userr.Email == data.Email) {
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

exports.loans = [{
  LoanId: 99,
  Email: 'kelvin@gmail.com',
  Amount: 300000.0,
  Tenor: 5,
  Balance: 24030.0,
  Interest: 30000,
  MonthlyInstallment: 28999,
  Repaid: 'True',
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
