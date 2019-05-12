const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');
const fullname = document.getElementById('yourName').innerHTML;

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
            if (loan.balance == '0.00')
            {
                document.getElementById('yourRepayBtn').value = 'Loan repayment made, Confim submission'
            }
        });
    })
};

fetchBalance();

document.getElementsByClassName('repayLoanForm')[0].addEventListener('submit', validateForm = (p) => {
    p.preventDefault();

    const currentBalance = document.getElementById('yourBalance').innerHTML;

    const amount = parseFloat(document.getElementById('amount').value);

    if (amount == null || amount == '')
    {
        document.getElementById('goodFeedBack').style.display = 'none'
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please Enter an Amount to repay Balance'
        return false;
    }

    if (amount > 20000000)
    {
        document.getElementById('goodFeedBack').style.display = 'none'
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Amount should not be more than 20million'
        return false;
    }

    else
    {
        const fullname = document.getElementById('yourName').innerHTML;
        fetch('http://localhost:3000/api/v1/user/loans/repay', {
            method: 'POST',
            body: JSON.stringify({Email: userEmail, Fullname: fullname, Amount: amount}),
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json, text/plain, */*'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.Error)
            {
                document.getElementById('goodFeedBack').style.display = 'none'
                document.getElementById('badFeedBack').style.display = 'block';
                document.getElementById('badFeedBack').innerHTML = data.Error
            }

            if (data.Status == '201')
            {
                document.getElementById('goodFeedBack').style.display = 'block'
                document.getElementById('badFeedBack').style.display = 'none';
                document.getElementById('goodFeedBack').innerHTML = data.Success   
            }
        })
    }
});