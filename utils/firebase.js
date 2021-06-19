import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  try {
    var firebaseConfig = {
        apiKey: "AIzaSyArdLoByBNulFarJU73Sz3zLP4l7LT7oWM",
        authDomain: "benuccimilano-eec7d.firebaseapp.com",
        projectId: "benuccimilano-eec7d",
        storageBucket: "benuccimilano-eec7d.appspot.com",
        messagingSenderId: "244987086556",
        appId: "1:244987086556:web:46703cac12c34fd7de5619",
        measurementId: "G-WNDVX58ZQM"
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
