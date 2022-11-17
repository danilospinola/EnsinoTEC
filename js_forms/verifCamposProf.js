const form  = document.getElementById('formCadProf'); //essa variavel ela pega o formulario pela ID
const campos = document.querySelectorAll('.required'); //Pega todos os elementos que tem a classe required
const spans = document.querySelectorAll('.span-required'); //Pega todos os elementos que tem a classe span-required
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // Este é um validador de email (verifica se tem os simbolos necessários)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validarNome();
    validarEmail();
    validarCPF();
    validarNIF();
    validarTel();
    validarSenha();
    compararSenhas();
});

function chamarErro(index){
    spans[index].style.display = 'block';
}

function removerErro(index){
    spans[index].style.display = 'none';
}

function validarNome(){ // função que valida o nome
    if(campos[0].value.length < 4)
    {
        chamarErro(0);
    }

    else
    {
        removerErro(0);
    }
}

function validarEmail(){ // função que valida o email
    if(!emailRegex.test(campos[1].value))
    {
        chamarErro(1);
    }

    else
    {
        removerErro(1);
    }
}

function validarCPF(){
    if(campos[2].value.length < 11 || isNaN(campos[2].value) == true)
    {
        chamarErro(2);
    }

    else
    {
        removerErro(2);
    }
}

function validarNIF(){
    if(campos[3].value.length < 10 || isNaN(campos[3].value) == true)
    {
        chamarErro(3);
    }

    else
    {
        removerErro(3);
    }
}

function validarTel(){
    if(campos[4].value.length < 11 || isNaN(campos[4].value) == true)
    {
        chamarErro(4);
    }

    else
    {
        removerErro(4);
    }
}

function validarSenha(){ //função que valida a senha
    if(campos[5].value.length < 8)
    {
        chamarErro(5);
    }
    else{
        removerErro(5);
    }
}

function compararSenhas(){ //compara os dois campos de senha
    if(campos[5].value == campos[6].value && campos[6].value.length >= 8) {
        removerErro(6);
    }else {
        chamarErro(6);
    }
}