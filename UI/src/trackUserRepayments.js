const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

document.getElementById('searchRepayments').addEventListener('submit', validateForm = (p) => {
    p.preventDefault();

    const loanId = parseInt(document.getElementById('loanId').value);
    var newData = '';

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/${loanId}/repayments`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json, text/plain, */*'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        data.Data.forEach(loan => {
            newData += `<div class="struc_one">
                <h4 class="struc_text3">LoanId: ${loan.loanid}</h4>
                <h4 class="struc_text1">Amount: shs ${loan.amount}</h4>
                <h4 class="struc_text1">Date Payed: ${loan.createdon}</h4>
            </div>

            <div class="struc_three">
                <h4 class="struc_text3">Investee: ${loan.investee_name}</h4>
                <h4 class="struc_text2">Payed: shs ${loan.paidamount}</h4>
                <h4 class="struc_text2">Installment: shs ${loan.monthlyinstallment}</h4>
            </div>`
            document.getElementsByClassName('loan_unrepaid')[0].innerHTML = newData;
        })
    }) 
});