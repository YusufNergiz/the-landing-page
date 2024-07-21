// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmidtRH0BFcl6h7iOu00DE1KxULP4o8UM",
  authDomain: "quicklaunch-designs.firebaseapp.com",
  projectId: "quicklaunch-designs",
  storageBucket: "quicklaunch-designs.appspot.com",
  messagingSenderId: "1017104019805",
  appId: "1:1017104019805:web:81c89d0db02fb1611ab8b4",
  measurementId: "G-WW5B0RDQCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);