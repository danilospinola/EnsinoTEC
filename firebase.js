// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6pmwZQTnziu-aLa8yFeN0fXFikEdZjug",
  authDomain: "ensino-tec.firebaseapp.com",
  projectId: "ensino-tec",
  storageBucket: "ensino-tec.appspot.com",
  messagingSenderId: "467024829123",
  appId: "1:467024829123:web:26b36f112377e27f592076",
  measurementId: "G-0GHT9WC2DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);