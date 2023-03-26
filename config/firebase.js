import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcioL78boG8dOwlSUSL_KA3gd1IWqVVDo",

  authDomain: "saviour-5a697.firebaseapp.com",

  projectId: "saviour-5a697",

  storageBucket: "saviour-5a697.appspot.com",

  messagingSenderId: "947754209678",

  appId: "1:947754209678:web:7fb6b98db8d595510d54df",

  measurementId: "G-7H7MG81RN6",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { auth, db };
