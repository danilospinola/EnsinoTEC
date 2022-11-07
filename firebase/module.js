import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6pmwZQTnziu-aLa8yFeN0fXFikEdZjug",
  authDomain: "ensino-tec.firebaseapp.com",
  projectId: "ensino-tec",
  storageBucket: "ensino-tec.appspot.com",
  messagingSenderId: "467024829123",
  appId: "1:467024829123:web:26b36f112377e27f592076",
  measurementId: "G-0GHT9WC2DR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**/

//Criando usuário com Authentication + enviando informações pro banco.
document.getElementById('btnCadastrar').addEventListener('click', function(){

    //Capturando valores do input.
        let inputNomeCompleto = document.getElementById('inputNomeCompleto').value
        let inputEmail = document.getElementById('inputEmail').value
        let inputCpf = document.getElementById('inputCpf').value
        let inputRa = document.getElementById('inputRa').value
        let inputUf = document.getElementById('inputUf').value
        let inputTelefone = document.getElementById('inputTelefone').value
        let inputSenha = document.getElementById('inputSenha').value
        let inputConfirmarSenha = document.getElementById('inputConfirmarSenha').value
    
    //Estrutura de autênticação de usuário a partir de email e senha.

        createUserWithEmailAndPassword(auth, inputEmail, inputSenha)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Sucesso!")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Erro!")
        });
})