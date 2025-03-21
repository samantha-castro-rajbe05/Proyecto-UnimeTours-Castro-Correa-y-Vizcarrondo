import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from "/firebaseConfig";

export const appfb = firebase.initializeApp(firebaseConfig)({
    "projectId": "unimetours-ccd0d",
    "appId": "1:349286708328:web:154f6a901059a1a32cb7dd",
    "storageBucket": "unimetours-ccd0d.firebasestorage.app",
    "apiKey": "AIzaSyDp-IIYthTLoyyAfPBhCN81G3mfWmCyNBw",
    "authDomain": "unimetours-ccd0d.firebaseapp.com",
    "messagingSenderId": "349286708328",
    "measurementId": "G-9Y08QXKD14"
  });