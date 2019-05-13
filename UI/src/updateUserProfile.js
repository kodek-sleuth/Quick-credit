const previewImage = () => {
    const preview = document.getElementById('yourImage2');
    const image = document.getElementById('updatePic').files[0];

    let reader = new FileReader();

    reader.addEventListener('load', () => {
        preview.src = reader.result;
    }, false);

    if (image)
    {
        reader.readAsDataURL(image);
    }
};

document.getElementById('updatePP').addEventListener('submit', validatePicture = (p) => {

    p.preventDefault();

    let formData = new FormData();

    const image = document.getElementById('updatePic').files[0];
    formData.append('Image', image);

    fetch(`http://localhost:3000/api/v1/user/${userEmail}/profile/image`, {
        method: 'POST',
        body: formData,
        headers: {  
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json, text/plain, */*'
        }
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
});