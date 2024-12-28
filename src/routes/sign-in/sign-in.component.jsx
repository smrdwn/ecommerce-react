import React, { useEffect, useState } from 'react';
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentAuth,
} from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('Current Authenticated User:', currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-In with Popup
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log('Popup Sign-In Success:', user);
      await createUserDocumentAuth(user);
      setUser(user);
    } catch (error) {
      console.error('Error signing in with Google (Popup):', error.message);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleGoogleSignIn}>Sign In with Google (Popup)</button>
          <SignUpForm />
    </div>
  );
};

export default SignIn;
