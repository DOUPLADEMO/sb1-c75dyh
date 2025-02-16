// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNJPGP2qbyBEDBg6NjmYvAumSrJX3eTr8",
    authDomain: "bedtimestories1-5f241.firebaseapp.com",
    projectId: "bedtimestories1-5f241",
    storageBucket: "bedtimestories1-5f241.firebasestorage.app",
    messagingSenderId: "565165375001",
    appId: "1:565165375001:web:19a172587f6cb98d213488",
    measurementId: "G-39NZLVW8RF"
};
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
