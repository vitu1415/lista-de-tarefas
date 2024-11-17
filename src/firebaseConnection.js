import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBp8ga3ccZlcybcoPbQN9DuoOJVEHCVdVY",
    authDomain: "curso-6c50d.firebaseapp.com",
    projectId: "curso-6c50d",
    storageBucket: "curso-6c50d.firebasestorage.app",
    messagingSenderId: "288136305416",
    appId: "1:288136305416:web:381b8d01394c2883396abd",
    measurementId: "G-9640VD4H5S"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };