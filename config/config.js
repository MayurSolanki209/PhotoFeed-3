import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCH6tcKvXI_X6mfLo8njDnrqjdewzAxL3k",
    authDomain: "realphotofeed.firebaseapp.com",
    databaseURL: "https://realphotofeed.firebaseio.com",
    projectId: "realphotofeed",
    storageBucket: "realphotofeed.appspot.com",
    messagingSenderId: "334481925736",
    appId: "1:334481925736:web:6f4177b913eda118d43ddd",
    measurementId: "G-9E31Q1YWES"
};
// Initialize Firebase
firebase.initializeApp(config);

export const f        = firebase;
export const database = firebase.database();
export const auth     = firebase.auth();
export const storage  = firebase.storage();
