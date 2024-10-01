// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "madadiblog.firebaseapp.com",
  projectId: "madadiblog",
  storageBucket: "madadiblog.appspot.com",
  messagingSenderId: "598915628217",
  appId: "1:598915628217:web:1e6377cfa7db9330df6f68"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
