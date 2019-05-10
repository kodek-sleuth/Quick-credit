const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

const fetchTotalLoansCount = () => {

    var totalLoanAmount = 0;

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {

        if (parseInt(data.Count) > 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementById('stat_loan_amount').textContent = data.Count;
            
            data.Data.forEach(loan => {
                totalLoanAmount += parseFloat(loan.amount);
            });

            document.getElementById('stat_total_loan_amount').textContent = `Total Credit shs ${totalLoanAmount}`;
        }

        if (parseInt(data.Count) == 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementById('stat_loan_amount').textContent = data.Count;
        
            document.getElementById('stat_total_loan_amount').textContent = 'Total Credit shs 0';
        }
    })
};

fetchTotalLoansCount();

const fetchRepaidLoansCount = () => {

    var totalRepaidAmount = 0;

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/repaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (parseInt(data.Count) > 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementsByClassName('repaidStatCount')[0].textContent = data.Count;
            
            data.Data.forEach(loan => {
                totalRepaidAmount += parseFloat(loan.amount);
            });

            document.getElementsByClassName('repaidStatTotal')[0].textContent = `Total Credit shs ${totalRepaidAmount}`;
        }

        if (parseInt(data.Count) == 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementsByClassName('repaidStatCount')[0].textContent = data.Count;
        
            document.getElementsByClassName('repaidStatTotal')[0].textContent = 'Total Credit shs 0.0000';
        }
    })
};

fetchRepaidLoansCount();

const fetchUnRepaidLoansCount = () => {

    var totalUnRepaidAmount = 0;

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/unrepaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (parseInt(data.Count) > 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementsByClassName('unRepaidStatCount')[0].textContent = data.Count;
            
            data.Data.forEach(loan => {
                totalUnRepaidAmount += parseFloat(loan.amount);
            });

            document.getElementsByClassName('unRepaidStatTotal')[0].textContent = `Total Credit shs ${totalUnRepaidAmount}`;
        }

        if (parseInt(data.Count) == 0)
        {
            // Change the loanAmount to actual values from database
            document.getElementsByClassName('unRepaidStatCount')[0].textContent = data.Count;
        
            document.getElementsByClassName('unRepaidStatTotal')[0].textContent = 'Total Credit shs 0.0000';
        }
    })
};

fetchUnRepaidLoansCount();


const fetchUnrepaidLoan = () => {
    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/repaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (parseInt(data.Count) > 0){
            

        }
    })

};

fetchUnrepaidLoan();