// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_apiXFfFHB3pT6G0aWigxodol0pZm2Gs",
    authDomain: "semanatecconectandoelmundoweb.firebaseapp.com",
    projectId: "semanatecconectandoelmundoweb",
    storageBucket: "semanatecconectandoelmundoweb.appspot.com",
    messagingSenderId: "102881979996",
    appId: "1:102881979996:web:412e49bd9fa7c6b6470099",
    measurementId: "G-ZJQQ19GBYD"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
