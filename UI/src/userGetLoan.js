const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

document.getElementsByClassName('userGetLoanForm')[0].addEventListener('submit', validateForm = (p) => {

    p.preventDefault();

    const amount = document.getElementById('amount').value;
    const tenor = document.getElementsByName('dropdown')[0].value;

    if (amount == null || amount == '')
    {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please Enter Amount e.g 2000000 for 2million'
        return false;
    }

    const newAmount = parseFloat(amount)
    const newTenor = parseInt(tenor.split(' ')[0]);
    
    if (newAmount > 20000000)
    {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Amount should be lower than 20 million'
        return false;
    }

    else
    {
        const fullname = document.getElementById('yourName').textContent;
        fetch(`http://localhost:3000/api/v1/user/loans/apply`, {
            method: 'POST',
            body: JSON.stringify({Email: userEmail, Fullname: fullname, Amount: newAmount, Tenor: newTenor}),
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json, text/plain, */*'
            }
        })
        .then((response) => response.json())
        .then((data) => {

            if (data.Success)
            {
                document.getElementById('badFeedBack').style.display = 'none';
                document.getElementById('goodFeedBack').style.display = 'block';
                document.getElementById('goodFeedBack').innerHTML = data.Success;
            }

            if (data.Error)
            {
                document.getElementById('goodFeedBack').style.display = 'none';
                document.getElementById('badFeedBack').style.display = 'block';
                document.getElementById('badFeedBack').innerHTML = data.Error;
            }
        })
    }
});