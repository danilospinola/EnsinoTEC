let htmlAtual = document.location.pathname

//Inicializa aplicação e sincroniza com o Firebase.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

//Importa principais métodos de autenticação.
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

//Importa principais métodos de conexão com o Firestore.
import { getFirestore, getDoc,doc, getDocs, addDoc, collection,query, where } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

//Configurações do Projeto no Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyC6pmwZQTnziu-aLa8yFeN0fXFikEdZjug",
  authDomain: "ensino-tec.firebaseapp.com",
  projectId: "ensino-tec",
  storageBucket: "ensino-tec.appspot.com",
  messagingSenderId: "467024829123",
  appId: "1:467024829123:web:26b36f112377e27f592076",
  measurementId: "G-0GHT9WC2DR"
};

//Variáveis de inicialização de módulos importados.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**//**//**/

/* [!] CADASTRO USUÁRIO ALUNO */ 

//Criando usuário 'Aluno' com Authentication + enviando informações pro banco.
document.getElementsByTagName("button")[0].addEventListener('click', function(){

    //Capturando valores do input (cadastro Aluno).
    if (htmlAtual == "/EnsinoTEC/cad-aluno.html"){


        let inputNomeCompleto = document.getElementById('inputNomeCompleto').value
        let inputEmail = document.getElementById('inputEmail').value
        let inputCpf = document.getElementById('inputCpf').value
        let inputRa = document.getElementById('inputRa').value
        let inputUf = document.getElementById('inputUf').value
        let inputTelefone = document.getElementById('inputTelefone').value
        let inputSenha = document.getElementById('inputSenha').value
        let inputConfirmarSenha = document.getElementById('inputConfirmarSenha').value

        if (inputNomeCompleto.length > 3 && inputEmail.length > 0 && inputCpf.length > 10 && inputRa.length > 9 && inputUf.length > 1 && inputTelefone.length > 10 && inputSenha.length > 7 && inputConfirmarSenha.length > 7 && inputSenha == inputConfirmarSenha){

            createUserWithEmailAndPassword(auth, inputEmail, inputSenha)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Sucesso!")
                //Estrutura de criação de coleção de dados + armazenamento no firestore (uma vez que a autenticação e cadastro foram bem-sucedidos)
                addDoc(collection(db, "Aluno"), {
                    inputNomeCompleto: `${inputNomeCompleto}`,
                    inputEmail: `${inputEmail}`,
                    inputCpf: `${inputCpf}`,
                    inputRa: `${inputRa}`,
                    inputUf: `${inputUf}`.toUpperCase(),
                    inputTelefone: `${inputTelefone}`,
                    idUsuario: `${user.uid}`
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/email-already-in-use"){
                    alert("Email já em uso");
                    signInWithEmailAndPassword(auth, inputEmailProf, inputSenhaProf)
                    window.location.href = "/EnsinoTEC/grupos.html"
                }else{
                    alert(errorCode)
                }
            });
        }

    /* [!] CADASTRO USUÁRIO Professor */ 

    } else if (htmlAtual == "/EnsinoTEC/cad-prof.html"){



        let inputNomeCompletoProf = document.getElementById('inputNomeCompletoProf').value
        let inputEmailProf = document.getElementById('inputEmailProf').value
        let inputCpfProf = document.getElementById('inputCpfProf').value
        let inputNif = document.getElementById('inputNif').value
        let inputTelefoneProf = document.getElementById('inputTelefoneProf').value
        let inputSenhaProf = document.getElementById('inputSenhaProf').value
        let inputConfirmarSenhaProf = document.getElementById('inputConfirmarSenhaProf').value

        if (inputNomeCompletoProf.length > 3 && inputEmailProf.length > 0 && inputCpfProf.length > 10 && inputNif.length > 9 && inputTelefoneProf.length > 10 && inputSenhaProf.length > 7 && inputConfirmarSenhaProf.length > 7 && inputSenhaProf == inputConfirmarSenhaProf){

            createUserWithEmailAndPassword(auth, inputEmailProf, inputSenhaProf)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Sucesso!")

                //Estrutura de criação de coleção de dados + armazenamento no firestore (uma vez que a autenticação e cadastro foram bem-sucedidos)
                addDoc(collection(db, "Professor"), {
                    inputNomeCompletoProf: `${inputNomeCompletoProf}`,
                    inputEmailProf: `${inputEmailProf}`,
                    inputCpfProf: `${inputCpfProf}`,
                    inputNif: `${inputNif}`,
                    inputTelefoneProf: `${inputTelefoneProf}`,
                    idUsuario: `${user.uid}`
                });
            })

            // Tratando exceptions cadastro
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/email-already-in-use"){
                    alert("Email já em uso");
                    signInWithEmailAndPassword(auth, inputEmailProf, inputSenhaProf)
                    window.location.href = "/EnsinoTEC/gruposProfessor.html"
                }else{
                    alert(errorCode)
                }
            });
        };
    

    /* [!] Login USUÁRIO Professor */ 

    } else if (htmlAtual == "/EnsinoTEC/login-prof.html"){


        let email = document.getElementById('inputEmail').value
        let password = document.getElementById('inputSenha').value

                //Logando na conta do usuário professor
            signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user

                const q = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                window.location.href = "/EnsinoTEC/gruposProfessor.html"
                });

                const qy = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

                const querySnapshot2 = await getDocs(qy);
                querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                alert("Aluno identificado... redirecionando página")
                window.location.href = "/EnsinoTEC/grupos.html"
                });


            })
            //Exceptions do login
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/user-not-found"){
                    alert("Usuário não existente, por favor realize o cadastro.")
                }else if (errorCode == "auth/wrong-password") {
                    alert("Email ou senha incorreta!")}
                else if(errorCode == "auth/internal-error"){alert("Ops um erro ocorreu, tente novamente mais tarde")}
                else {alert(errorCode, "Ops um erro ocorreu")}
            });



        
    } else if (htmlAtual == "/EnsinoTEC/login-aluno.html"){


        let email = document.getElementById('inputEmail').value
        let password = document.getElementById('inputSenha').value

        //Logando na conta do usuário aluno
            signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user

                const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                window.location.href = "/EnsinoTEC/grupos.html"
                });

                const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));

                const querySnapshot2 = await getDocs(qy);
                querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                alert("Professor identificado... redirecionando página")
                window.location.href = "/EnsinoTEC/gruposProfessor.html"
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/user-not-found"){
                    alert("Usuário não existente, por favor realize o cadastro.")
                }else if (errorCode == "auth/wrong-password") {
                alert("Email ou senha incorreta!")}
                else if(errorCode == "auth/internal-error"){alert("Ops um erro ocorreu")}
                else {alert(errorCode)}
            });
            
            
    } 
}) 
if (htmlAtual == "/EnsinoTEC/perfil-aluno.html"){

    alert("Teste")
}


