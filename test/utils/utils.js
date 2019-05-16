/* eslint-disable comma-dangle */

// User Details
exports.userLoginDetails = {
  Email: 'kelvin@gmail.com',
  Password: 'stealth'
};

exports.userSignup = {
  Firstname: 'Marv',
  Lastname: 'Tindeyebwa',
  Email: 'marv@gmail.com',
  Password: 'stealth',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe'
};

exports.userSignupEmailTaken = {
  Firstname: 'Marv',
  Lastname: 'Tindeyebwa',
  Email: 'kelvin@gmail.com',
  Password: 'stealth',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe',
  Status: 'Verified'
};

exports.userSignupMissingFields = {
  Firstname: 'Marv',
  Lastname: 'Tindeyebwa',
  Password: 'stealth',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe'
};

exports.userSignupShortPassword = {
  Firstname: 'Marv',
  Lastname: 'Tindeyebwa',
  Email: 'mani@gmail.com',
  Password: 'stea',
  isAdmin: 'False',
  Address: 'Kitende, Entebbe',
  Status: 'Verified'
};

// Admin object
exports.adminLoginDetails = {
  isAdmin: 'True',
  Email: 'yahya@gmail.com',
  Password: 'stealth'
};


exports.loanApplication = {
  Email: 'kelvin@gmail.com',
  Amount: 290000,
  Tenor: 2
};

exports.loanExists = {
  Email: 'kelvin@gmail.com',
  Fullname: 'Kelvin Richie',
  Amount: 790000,
  Tenor: 2
};

exports.loanApplicationPresent = {
  Email: 'john@gmail.com',
  Fullname: 'John Kisakye',
  Amount: 290000,
  Tenor: 3
};

exports.repayLoan = {
  Email: 'melvin@gmail.com',
  Amount: 3000
};

exports.userFalseDetails = {
  Email: 'malvina@gmail.com',
  Password: 'stealth'
};
