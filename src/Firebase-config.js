// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, initializeFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPQdsd8PktFkUwNcnONS9OBTJ_DCf4LAc",
  authDomain: "may17try1.firebaseapp.com",
  projectId: "may17try1",
  storageBucket: "may17try1.appspot.com",
  messagingSenderId: "627182912121",
  appId: "1:627182912121:web:ea853e27668c67ba61caa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {ignoreUndefinedProperties: true})