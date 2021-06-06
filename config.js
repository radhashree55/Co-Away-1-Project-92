import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyA0lZRVZVyZd4qLbiLrFW11TCDSLrqN6Zw",
  authDomain: "coaway-4de1a.firebaseapp.com",
  projectId: "coaway-4de1a",
  storageBucket: "coaway-4de1a.appspot.com",
  messagingSenderId: "103297836700",
  appId: "1:103297836700:web:81e5e3467722215ff86f59",
  measurementId: "G-21G978FPGS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
