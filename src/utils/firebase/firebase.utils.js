import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const analytics = getAnalytics(firebaseapp);

// Initialize Authentication
const auth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({prompt: 'select_account'});

// Google Sign-In Functions
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Create User Document in Firestore
const createUserDocumentAuth = async(userAuth, additionalInformation={}) => {
    if (!userAuth) 
        return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
            console.log('User document created successfully');
        } catch (error) {
            console.error('Error creating user document:', error.message);
        }
    } else {
        console.log('User already exists in Firestore');
    }
};

const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email && !password) 
        return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email && !password) 
        return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}



export {db, auth, signInWithGooglePopup, createUserDocumentAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword};
