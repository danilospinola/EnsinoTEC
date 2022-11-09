let inputSenha = document.getElementById('inputSenha')
let inputConfirmarSenha = document.getElementById('inputConfirmarSenha')

let inputCheckSenha = document.getElementById('inputCheckSenha')

inputCheckSenha.addEventListener('click', function(){
    if (inputCheckSenha.checked === true){
        inputSenha.type = 'text'
        inputConfirmarSenha.type = 'text'
    } else {
        inputSenha.type = 'password'
        inputConfirmarSenha.type = 'password'
    }
})