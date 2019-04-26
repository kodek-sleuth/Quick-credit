document.querySelector('table').addEventListener('click', implementFunctionailty)

function implementFunctionailty(e)
{
    if(e.target.classList.contains('table_btn_verify'))
    {
        var row = e.target.parentElement.parentElement;
        console.log(parseInt(row.children[0].textContent)+8)
    }
}