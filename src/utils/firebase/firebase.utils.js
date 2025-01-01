import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';
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
const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) => {
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
    return userSnapshot;
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

 const handleSignOut = async () => {
    try {
      await signOut(auth);
      //setUser(null);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
  }

  // used to push shop_data to firebase db (used only once)
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
  }

  const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  }

export {
    db, 
    auth, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    createAuthUserWithEmailAndPassword, 
    signInAuthUserWithEmailAndPassword,
    handleSignOut,
    onAuthStateChangedListener,
    getCategoriesAndDocuments
};
