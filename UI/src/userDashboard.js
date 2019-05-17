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
    let newLoan = '';

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/unrepaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (parseInt(data.Count) == 0){
            newLoan += `<div class="no_un_repaidBox">You currently don't have an unrepaid loan</div>`
            document.getElementsByClassName('loan_unrepaid')[0].innerHTML = newLoan;        
        }

        if (parseInt(data.Count) == 1){
            data.Data.forEach(loan => {
                newLoan += `<div class="struc_one">
                    <h4 class="struc_text3">Balance: shs ${loan.balance}</h4>
                    <h4 class="struc_text1">Amount: shs ${loan.amount}</h4>
                    <h4 class="struc_text1">Date Applied: ${loan.createdon}</h4>
                </div>

                <div class="struc_two">
                    <h4 class="struc_text2">Interest: shs ${loan.interest}</h4>
                    <h4 class="struc_text2">Installment: shs ${loan.paymentinstallment}</h4>
                    <h4 class="struc_text2">Repaid: ${loan.repaid}</h4>
                </div>

                <div class="struc_three">
                    <h4 class="struc_text3">Investee: ${loan.investee_name}</h4>
                    <h4 class="struc_text2">Tenor: ${loan.tenor} months</h4>
                    <h4 class="struc_text2">Status: ${loan.status}</h4>
                </div>`
            })
            document.getElementsByClassName('loan_unrepaid')[0].innerHTML = newLoan;
        }
    })

};

fetchUnrepaidLoan();

const fetchRepaidLoans = () => {
    let newLoan = '';

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/repaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (parseInt(data.Count) == 0)
        {
            newLoan += `<div class="no_un_repaidBox">You currently don't have a repaid loan</div>`
            document.getElementsByClassName('loan_repaid')[0].innerHTML = newLoan;
        }

        if (parseInt(data.Count) > 0)
        {
            data.Data.forEach(loan => {
                newLoan += `<div class="struc_one">
                    <h4 class="struc_text3">Investee: shs ${loan.investee_name}</h4>
                    <h4 class="struc_text1">Amount: shs ${loan.amount}</h4>
                    <h4 class="struc_text1">Date Applied: ${loan.createdon}</h4>
                </div>

                <div class="struc_two">
                    <h4 class="struc_text2">Interest: shs ${loan.interest}</h4>
                    <h4 class="struc_text2">Status: shs ${loan.status}</h4>
                    <h4 class="struc_text2">Repaid: ${loan.repaid}</h4>
                </div>

                <div class="struc_three">
                    <h4 class="struc_text3 textToLeft">Balance: ${loan.balance}</h4>
                    <h4 class="struc_text2">Tenor: ${loan.tenor} months</h4>
                    <h4 class="struc_text2">Installment: ${loan.paymentinstallment}</h4>
                </div>`
            })
            document.getElementsByClassName('loan_repaid')[0].innerHTML = newLoan;
        }
    })
};

fetchRepaidLoans();