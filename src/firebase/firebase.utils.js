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


/*
    A query reference obj is an obj that represents the 'current' place in the DB we are querying
    Eg. firestore.doc('/users/:userId'), firestore.collections('/users')
    DocumentReference: CRUD - set(), get(), update(), delete()
*/

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log(userRef);
    const snapShot = await userRef.get();
    console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

