// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVA6kEcqScByoI69X2M15-zYd1uEPfxn8",
  authDomain: "userdata-b0b6d.firebaseapp.com",
  projectId: "userdata-b0b6d",
  storageBucket: "userdata-b0b6d.appspot.com",
  messagingSenderId: "1068366480778",
  appId: "1:1068366480778:web:5f928984e7e8b9d5eb3473",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
