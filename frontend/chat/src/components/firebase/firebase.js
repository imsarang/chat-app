// import { initializeApp } from "firebase/app";
// import 'firebase/auth'
import firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDceeAUEJmPBZDZptjt9m-UblxAbL7GZlo",
  authDomain: "chat-app-c9556.firebaseapp.com",
  projectId: "chat-app-c9556",
  storageBucket: "chat-app-c9556.appspot.com",
  messagingSenderId: "1034845545287",
  appId: "1:1034845545287:web:c8b0e99370f9ae9125a262",
  measurementId: "G-DZM7XEG93C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()