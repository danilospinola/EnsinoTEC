let inputSenhaProf = document.getElementById('inputSenhaProf')
let inputConfirmarSenhaProf = document.getElementById('inputConfirmarSenhaProf')

let inputCheckSenha = document.getElementById('inputCheckSenha')

inputCheckSenha.addEventListener('click', function(){
    if (inputCheckSenha.checked === true){
        inputSenhaProf.type = 'text'
        inputConfirmarSenhaProf.type = 'text'
    } else {
        inputSenhaProf.type = 'password'
        inputConfirmarSenhaProf.type = 'password'
    }
})