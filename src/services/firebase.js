import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGA5yniId8UyL-PHdgRRELQyeMLFeesq0",
  authDomain: "kodokura-eb787.firebaseapp.com",
  databaseURL: "https://kodokura-eb787.firebaseio.com",
  projectId: "kodokura-eb787",
  storageBucket: "kodokura-eb787.appspot.com",
  messagingSenderId: "997431254763",
  appId: "1:997431254763:web:83cc7a91a7137ed338e8ae",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
export const firestore = firebase.firestore();
