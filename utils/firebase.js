import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  try {
    var firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log('Firebase initialization error', error.stack);
  }
}
const app = firebase.app();
const auth = firebase.auth();
const storage = firebase.storage();
const now = firebase.firestore.Timestamp.now();
export { app, auth, storage, now };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
