let htmlAtual = document.location.pathname

//Inicializa aplicação e sincroniza com o Firebase.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

//Importa principais métodos de autenticação.
import { getAuth,onAuthStateChanged, signOut, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

//Importa principais métodos de conexão com o Firestore.
import { getFirestore, getDocs, addDoc, collection,query, where } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

import { getStorage, ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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
const storage = getStorage(app);

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
                    alert("Email já em uso, faça login para continuar");
                    window.location.href = "/EnsinoTEC/login-prof.html"
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
                    alert("Email já em uso, faça login para continuar");
                    window.location.href = "/EnsinoTEC/login-prof.html"
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
                window.location.href = "/EnsinoTEC/perfil-prof.html"
                });

                const qy = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

                const querySnapshot2 = await getDocs(qy);
                querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                alert("Aluno identificado... redirecionando página")
                window.location.href = "/EnsinoTEC/perfil-aluno.html"
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
                window.location.href = "/EnsinoTEC/perfil-aluno.html"
                });

                const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));

                const querySnapshot2 = await getDocs(qy);
                querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                alert("Professor identificado... redirecionando página")
                window.location.href = "/EnsinoTEC/perfil-prof.html"
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
if (htmlAtual == "/EnsinoTEC/perfil-prof.html"){

        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
             let email = doc.data().inputEmailProf 
             document.getElementById("nomeCompleto").innerHTML = nome    
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("email").innerHTML = email    
             document.getElementById("emailUsuario").innerHTML = email   
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"  
                });
            } else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
        }else if (htmlAtual == "/EnsinoTEC/perfil-aluno.html"){


        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             console.log(email,nome)
             document.getElementById("nomeCompleto").innerHTML = nome    
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("email").innerHTML = email    
             document.getElementById("emailUsuario").innerHTML = email    
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
                });     
            } else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
          
        }else if(htmlAtual == "/EnsinoTEC/calendar_aluno.html"){        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };    
    }else if(htmlAtual == "/EnsinoTEC/calendar.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };   
    }else if(htmlAtual == "/EnsinoTEC/atvidades.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };   
    }else if(htmlAtual == "/EnsinoTEC/desemp.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };  
    }else if(htmlAtual == "/EnsinoTEC/grupos.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };  
    }else if(htmlAtual == "/EnsinoTEC/mural.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };  
    }else if(htmlAtual == "/EnsinoTEC/conversas.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/Atividades.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdJava.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });


          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/Atvdjava2.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdScript.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });


          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdScript2.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });


          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdHTML.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdCSS.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/AtvdSQL.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/INbackend.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });


          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/INbd.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/INcss.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/INhtml.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/materiais.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/Atvdjava.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }else if(htmlAtual == "/EnsinoTEC/DescAtvd.html"){
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;

              const q = query(collection(db, "Aluno"), where("idUsuario", "==", user.uid));

              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
             let nome = doc.data().inputNomeCompleto //Pegando o nome do Aluno e colocando na variavel nome
             let email = doc.data().inputEmail
             document.getElementById("nomeUsuario").innerHTML = nome    
             document.getElementById("emailUsuario").innerHTML = email  
             document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-aluno.html"  
             document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar_aluno.html" 
             document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/desemp.html" 
            });
                     
            const qy = query(collection(db, "Professor"), where("idUsuario", "==", user.uid));
        
            const querySnapshot2 = await getDocs(qy);
            querySnapshot2.forEach((doc) => {
            let nome = doc.data().inputNomeCompletoProf //Pegando o nome do professor e colocando na variavel nome
            let email = doc.data().inputEmailProf 
            document.getElementById("nomeUsuario").innerHTML = nome    
            document.getElementById("emailUsuario").innerHTML = email  
            document.getElementById("verPerfil").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html"
            document.getElementById("calendario").href = "https://danilospinola.github.io/EnsinoTEC/calendar.html"  
            document.getElementById("desemp").href = "https://danilospinola.github.io/EnsinoTEC/perfil-prof.html" 
            })
    }else {
                alert("Realize o Login")
                window.location.href = "/EnsinoTEC/login-aluno.html"
            }
          });

          document.getElementById("btnEncerrarSessao").onclick = function() {

            signOut(auth).then(() => {
                window.location.href = "/EnsinoTEC/login-prof.html"
              }).catch((error) => {
                // An error happened.
              });
        };
    }