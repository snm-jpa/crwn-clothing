import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAtpBQCzKkPEPT9U9nHEnnaj2OQgdMuCiM",
    authDomain: "crwn-db-258ed.firebaseapp.com",
    projectId: "crwn-db-258ed",
    storageBucket: "crwn-db-258ed.appspot.com",
    messagingSenderId: "301751513805",
    appId: "1:301751513805:web:23f49950ee2d9fe5d3ef84"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestorm = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

