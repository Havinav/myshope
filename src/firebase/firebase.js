// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXvb1lkzXez1YkwavRx9RA0wDa-EaN82E",
  authDomain: "myshopee-15b98.firebaseapp.com",
  projectId: "myshopee-15b98",
  storageBucket: "myshopee-15b98.firebasestorage.app",
  messagingSenderId: "140433110775",
  appId: "1:140433110775:web:a0e0e678cd963745d545f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const db = getFirestore(app);
export const auth = getAuth(app)