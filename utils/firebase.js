import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  try {
    firebase.initializeApp({        
      apiKey: "AIzaSyCPs4hjuEiD8viikfaB94E6Pt0ugfwF5n8",
      authDomain: "safamarwa-b7ce7.firebaseapp.com",
      projectId: "safamarwa-b7ce7",
      storageBucket: "safamarwa-b7ce7.appspot.com",
      messagingSenderId: "1062178643192",
      appId: "1:1062178643192:web:94c1e052b759a9f57d6f0d",
      measurementId: "G-R7HTCNTNBY"
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const now = firebase.firestore.Timestamp.now();
export { app, auth, db, storage, now };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
