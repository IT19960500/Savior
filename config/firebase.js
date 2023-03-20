import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-4OSzFLgDiucuJF43wXToNF1-FsQYl48",
  authDomain: "savior-f4176.firebaseapp.com",
  projectId: "savior-f4176",
  storageBucket: "savior-f4176.appspot.com",
  messagingSenderId: "364542439323",
  appId: "1:364542439323:web:5554551b8e663096ce7b3e",
  measurementId: "G-RH5XJ0G6BV",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore();

export { auth, db };
