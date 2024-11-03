// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXUXDRGgn5cNeq7ruZuUuU2LaKKPVjFBo",
  authDomain: "aura-be63f.firebaseapp.com",
  projectId: "aura-be63f",
  storageBucket: "aura-be63f.firebasestorage.app",
  messagingSenderId: "52825717396",
  appId: "1:52825717396:web:d3fcd5b9411e1e160ed281",
  measurementId: "G-M26V1573G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const analytics = getAnalytics(app);
export { auth, provider };
