const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

const fetchRepayments = () => {
    fetch(`http://localhost:3000/api/v1/user/${userEmail}/loans/unrepaid`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json, text/plain, */*'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        
    })
};

fetchRepayments()