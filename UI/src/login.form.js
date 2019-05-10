document.getElementsByClassName('loginForm')[0].addEventListener('submit', validateLogin = (p) => {
    p.preventDefault();
  
    // Getting Text data after form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementsByName('dropdown')[0].value;
    console.log(isAdmin);

    if (isAdmin == 'Are You an Admin') {
        document.getElementById('badFeedBack').style.display = 'block';
        document.getElementById('badFeedBack').innerHTML = 'Please choose  either True/False for admin Field';
        return false;
    }

    if (isAdmin == 'True')
    {
        if (email == null || email == '' && password == null || password == '') {
            document.getElementById('badFeedBack').style.display = 'block';
            document.getElementById('badFeedBack').innerHTML = 'Please fill out all fields';
            return false;
          }

        if (email.length > 40) {
            document.getElementById('badFeedBack').style.display = 'block';
            document.getElementById('badFeedBack').innerHTML = 'Email is too long';
            return false;
        }

        if (password.length < 6) {
            document.getElementById('badFeedBack').style.display = 'block';
            document.getElementById('badFeedBack').innerHTML = 'Password should have more than 6 characters';
            return false;
        }
        
        else{
            fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({isAdmin: isAdmin, Email: email, Password: password}),
          headers: {
            Accept: 'application/json, text/plain, */*'
          }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.Error && data.Status == 401)
            {
                document.getElementById('badFeedBack').style.display = 'block';
                document.getElementById('badFeedBack').innerHTML = data.Error;
            }
            
            else{
                document.getElementById('badFeedBack').style.display = 'none';
                document.getElementById('goodFeedBack').style.display = 'block';
                document.getElementById('goodFeedBack').innerHTML = `Welcome back ${data.Data.Fullname}`;
            }
        })
        }

        return true;
    }
});