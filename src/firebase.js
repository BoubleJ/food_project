// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf2wElzSjok8_ntFF7wiD9y66vZ5mWjsM",
  authDomain: "food-project-54789.firebaseapp.com",
  projectId: "food-project-54789",
  storageBucket: "food-project-54789.appspot.com",
  messagingSenderId: "76700856818",
  appId: "1:76700856818:web:b2ebcd1cb7b6898b537b6b",
  measurementId: "G-TZYLC37EPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db