const userToken = sessionStorage.getItem('UserToken');
const userEmail =  sessionStorage.getItem('UserEmail');

const getUserProfile = () => {
    fetch(`http://localhost:3000/api/v1/user/${userEmail}/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const fullname = data.Data[0].fullname;
        const email = data.Data[0].email;
        const image = data.Data[0].image;
        const address = data.Data[0].address;

        document.getElementById('yourName2').value = fullname;
        document.getElementById('yourImage2').src = 'http://localhost:3000/'+ image.split('/')[1];
        document.getElementById('yourEmail').value = email;
        document.getElementById('yourAddress').value = address;
    })
};

getUserProfile();