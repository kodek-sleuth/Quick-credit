const getProfile = () => {
    const cookieToken = document.cookie.split(';')[0].split(' ')[0].split('=')[1];
    const cookieEmail = document.cookie.split(';')[1].split(' ')[1].split('=')[1];

    console.log(cookieToken);
    fetch(`http://localhost:3000/api/v1/user/${cookieEmail}/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${cookieToken}`,
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const fullname = data.Data[0].fullname;
        const email = data.Data[0].email;
        const image = data.Data[0].image;
        console.log(image.split('/')[1]);

        document.getElementById('yourName').textContent = fullname;
        document.getElementById('yourImage').src = 'http://localhost:3000/'+ image.split('/')[1];

    })
};

getProfile();