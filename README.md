[![Build Status](https://travis-ci.org/kodek-sleuth/Quick-credit.svg?branch=ADC-challenge-3)](https://travis-ci.org/kodek-sleuth/Quick-credit)
[![Coverage Status](https://coveralls.io/repos/github/kodek-sleuth/Quick-credit/badge.svg?branch=ADC-challenge-3)](https://coveralls.io/github/kodek-sleuth/Quick-credit?branch=ADC-challenge-3)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a2b1009120b374af300/maintainability)](https://codeclimate.com/github/kodek-sleuth/Quick-credit/maintainability)

# Quick-credit
Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework


## Supporting Packages
#### Linter

* [ESLint](https://eslint.org/) - Linting Tool

## Installation/Getting Started
* Git clone repository
``` 
git clone <repo_url>
```

* Install all dependencies
```
npm install
```
## Running
```
npm start
```

## Testing

### Testing with [Postman](www.postman.com)
```
* Install and setup Postman 
* Navigate to localhost 4000 
```

### Testing with Mocha and Chai
```
npm test in terminal
```
## Features
* User can sign up.
* User sign in.
* User can apply for a loan.
* User can view all loan repayment history.
* Admin can mark a client as verified after confirming the client’s work or home address.
* Admin can view all loan applications.
* Admin can view a specific loan application.
* Admin can view current loans (not fully repaid).
* Admin can view all repaid loans.
* Admin can approve or reject a client’s loan application.
* Admin can post loan repayment transaction in favour of a client.

## Endpoints
|  Method  |  Endpoint  |  Task  |
|  --- |  --- |  ---  |
|  `POST`  |  `/api/v1/auth/signup`  |  `User signup`  |
|  `POST`  |  `/api/v1/auth/login`  |  `User login`  |
|  `POST`  |  `/api/v1/user/loan/apply`  |  `User apply for loan`  |
|  `GET`  |  `/api/v1/user/loans/:loanId/repayments`  |  `User view loan repayments`  |
|  `PATCH`  |  `/api/v1/admin/users/:userEmail/verify`  |  `Verify User`  |
|  `GET`  |  `/api/v1/admin/loans`  |  `Admin view all loans`  |
|  `GET`  |  `/api/v1/admin/loans/:loanId`  |  `Admin view specific loan`  |
|  `GET`  |  `/api/v1/admin/loans/unrepaid?status=Approved&repaid=False`  |  `All loans unrepaid`  |
|  `GET`  |  `/api/v1/admin/loans/repaid?status=Approved&repaid=True`  |  `All loans repaid`  |
|  `PATCH`  |  `/api/v1/admin/loans/:loanId/approve`  |  `Approve Loan`  |
|  `PATCH`  |  `/api/v1/admin/loans/:loanId/reject`  |  `Reject Loan`  |
|  `PATCH`  |  `/api/v1/admin/loans/:loanId/transac`  |  `Post transaction `  |

## Deployments
* Backend on [Heroku](https://quick-credit-loanapp.herokuapp.com/docs/)
* Frontend on [Github](https://kodek-sleuth.github.io/Quick-credit/UI/index.html)
* Tracker on [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2326998)

#### Credit
* All credit given to [Andela](https://andela.com) for presenting me this project and allow me hack it out
