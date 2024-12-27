import React, {useEffect, useState} from 'react';
import {db, auth, signInWithGooglePopup, createUserDocumentAuth} from '../../utils/firebase/firebase.utils';
import {onAuthStateChanged, signOut} from 'firebase/auth';

const SignIn = () => {

    const handleGoogleSignIn = async() => {
        try {
            const {user} = await signInWithGooglePopup();
            console.log(user, 'handleGoogleSignIn user');
            await createUserDocumentAuth(user);
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };

    const handleSignOut = async () => {
        try {
          const response = await signOut(auth);
          console.log(response);
          //setUser(null);
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    );
}

export default SignIn;