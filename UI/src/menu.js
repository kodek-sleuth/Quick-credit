document.getElementsByClassName('navbar_menu_icon')[1].addEventListener('click', showMenu);

function showMenu()
{

    $(function(){
        $('.side_navbar').slideDown(1000)
    });
}

document.getElementById('close_icon').addEventListener('click', closeMenu);

function closeMenu()
{

    $(function(){
        $('.side_navbar').slideUp(1000)
    });
}

