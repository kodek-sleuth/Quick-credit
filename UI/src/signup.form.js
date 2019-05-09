const previewFile = () => {
    // Fetching the Image Tag and its contents
    const preview = document.querySelector('#preview');
  
    // Fetching the File after input
    const file = document.querySelector('input[type=file]').files[0];
  
    // Object that returns a base 64 string of the file
    const reader = new FileReader();
  
    // Its asynchronous After a successfull read of the file it will be displayed from its data url which is assigned to preview.src
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    }, false);
  
    // the readAsDataURL method reads contents of the file and returns a data:URL
    if (file.size < 120000 && file.type == 'image/png' || file.type == 'image/jpeg') {
      reader.readAsDataURL(file);
    } else {
      document.getElementById('badFeedBack').style.display = 'block';
      document.getElementById('badFeedBack').innerHTML = 'Image should be png/jpeg and 150 kb or less';
    }
  };
  
  document.getElementsByClassName('signupForm')[0].addEventListener('submit', validateForm = (p) => {
    p.preventDefault();
  
    // Getting Text data after form submission
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const isAdmin = document.getElementsByName('dropdown')[0].value;
    console.log(isAdmin);
  
    if (isAdmin == 'Are You An Admin') {
      document.getElementById('badFeedBack').style.display = 'block';
      document.getElementById('badFeedBack').innerHTML = 'Please choose  either True/False for admin Field';
      return false;
    }
  
    if (isAdmin == 'True') {
      if (email == null || email == '' && fullname == null || fullname == '' && password == null || password == '') {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please fill out all fields';
        return false;
      }
  
      if (email.length > 40) {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Email is too long';
        return false;
      }
  
      if (fullname.length > 30) {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please use a shorter name';
        return false;
      }
  
      if (password.length < 6) {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Password should have more than 6 characters';
        return false;
      } 
      
      else {
        const file = document.querySelector('input[type=file]').files[0];
        let formData = new FormData();
        formData.append('Fullname', fullname);
        formData.append('Email', email);
        formData.append('isAdmin', isAdmin);
        formData.append('Password', password);
        formData.append('Image', file);
  
        console.log(formData.values);
  
        fetch('http://localhost:3000/api/v1/auth/signup', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json, text/plain, */*'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          
        })
      }
  
      return true;
    }
  
    if (isAdmin == 'False') {
      if (email == null || email == '' && fullname == null || fullname == '' && password == null || password == '' && address == null || address == '') {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please fill out all fields';
        console.log(6000);
      }
    }
});