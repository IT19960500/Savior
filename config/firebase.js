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

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

export { auth, db };
