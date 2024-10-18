// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDn3YUpKEut4WiLpnEwRb5DcydYmQE9pKs",
    authDomain: "agrawaltransport-5863a.firebaseapp.com",
    projectId: "agrawaltransport-5863a",
    storageBucket: "agrawaltransport-5863a.appspot.com",
    messagingSenderId: "632655587826",
    appId: "1:632655587826:web:cbfe5d4b56f95c8caea36b",
    measurementId: "G-33236HST8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };