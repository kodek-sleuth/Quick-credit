document.getElementsByClassName('navbar_menu_icon')[1].addEventListener('click', showMenu);

function showMenu()
{
    document.getElementsByClassName('side_navbar')[0].style.display = 'block';
}

document.getElementById('close_icon').addEventListener('click', closeMenu);

function closeMenu()
{
    document.getElementsByClassName('side_navbar')[0].style.display = 'none';  
}

