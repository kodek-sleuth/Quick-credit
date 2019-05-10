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
        
        // Change the loanAmount to actual values from database
        document.getElementById('stat_loan_amount').textContent = data.Count;
        
        data.Data.forEach(loan => {
            totalLoanAmount += parseFloat(loan.amount);
        });

        document.getElementById('stat_total_loan_amount').textContent = `Total Credit shs ${totalLoanAmount}`;
    })

};

fetchTotalLoansCount();