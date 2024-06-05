// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr6hFIQ4iVgWIsmWkh6vKSOOXNt-Obsk4",
  authDomain: "einsatzpla.firebaseapp.com",
  projectId: "einsatzpla",
  storageBucket: "einsatzpla.appspot.com",
  messagingSenderId: "201021149024",
  appId: "1:201021149024:web:0d9404fcb6b24f67dc5805",
  measurementId: "G-RSY10PSDXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);