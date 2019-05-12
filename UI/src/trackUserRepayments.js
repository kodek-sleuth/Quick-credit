const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

document.getElementById('searchRepayments').addEventListener('submit', validateForm = (p) => {
    p.preventDefault();

    const loanId = parseInt(document.getElementById('loanId').value);

    
});