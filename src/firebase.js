import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBZuxkOvaLB_t9CchONuhgL2Kq-9GlrsIw",
    authDomain: "minidic-6c2aa.firebaseapp.com",
    projectId: "minidic-6c2aa",
    storageBucket: "minidic-6c2aa.appspot.com",
    messagingSenderId: "1007906717732",
    appId: "1:1007906717732:web:91de100c4dd444360ed8b1"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();