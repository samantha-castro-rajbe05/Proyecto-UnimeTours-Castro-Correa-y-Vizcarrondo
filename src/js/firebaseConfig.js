import firebase from 'firebase/app';
import 'firebase/firestore'; 
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializar Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);