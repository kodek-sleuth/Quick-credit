const getProfile = () => {
    const userToken = sessionStorage.getItem('UserToken');
    const userEmail =  sessionStorage.getItem('UserEmail');

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

        document.getElementById('yourName').textContent = fullname;
        document.getElementById('yourImage').src = 'http://localhost:3000/'+ image.split('/')[1];

    })
};

getProfile();