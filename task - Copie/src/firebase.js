// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyAwwi9sLXIdEdejSwRjYng9fKOEEWclDzA",
    authDomain: "announcements-app-da212.firebaseapp.com",
    projectId: "announcements-app-da212",
    storageBucket: "annousncements-app-da212.appspot.com",
    messagingSenderId: "243988152292",
    appId: "1:243988152292:web:dbd2bcad55cb080b9651f1",
    measurementId: "G-XN1F1C9YHF"
  };
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};
export default db;
