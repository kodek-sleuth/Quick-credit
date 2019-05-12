const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

const fetchBalance = () => {
    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/unrepaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json, text/plain, */*'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        data.Data.forEach(loan => {
            document.getElementById('yourBalance').innerHTML =`Current Balance =>  ${loan.balance}`;
        });
    })
};

fetchBalance();

document.getElementsByClassName('repayLoanForm')[0].addEventListener('submit', validateForm = (p) => {
    p.preventDefault();

    const amount = document.getElementById('amount').value;

    if (amount == null || amount == '')
    {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please Enter an Amount to repay Balance'
    }


});
