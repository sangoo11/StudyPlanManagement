// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDazzg8fq6QEY01hPx5M7lsE_B-tmO-MWk",
    authDomain: "edu-organizer-cloud.firebaseapp.com",
    projectId: "edu-organizer-cloud",
    storageBucket: "edu-organizer-cloud.firebasestorage.app",
    messagingSenderId: "84367081796",
    appId: "1:84367081796:web:340b6dbe8d9c404efd5711",
    measurementId: "G-BWQP0E5265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase initialized");