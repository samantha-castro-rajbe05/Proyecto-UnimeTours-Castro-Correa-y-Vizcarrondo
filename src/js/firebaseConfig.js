import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp-IIYthTLoyyAfPBhCN81G3mfWmCyNBw",
  authDomain: "unimetours-ccd0d.firebaseapp.com",
  projectId: "unimetours-ccd0d",
  storageBucket: "unimetours-ccd0d.firebasestorage.app",
  messagingSenderId: "349286708328",
  appId: "1:349286708328:web:fc9355d99805006d2cb7dd",
  measurementId: "G-7TGGE83CE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();