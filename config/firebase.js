import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlzc2Z2tG_eKWBkyk1DggGvJo78bO4XOA",
    authDomain: "disasterapp-cc929.firebaseapp.com",
    projectId: "disasterapp-cc929",
    storageBucket: "disasterapp-cc929.appspot.com",
    messagingSenderId: "429682382523",
    appId: "1:429682382523:web:a1ac5a83e30c5ccdb1fb9e",
    measurementId: "G-RF62CEZ00S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
