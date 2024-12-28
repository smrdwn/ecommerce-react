import React, { useEffect, useState } from 'react';
import {
  auth,
} from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
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
    <div className='authentication-container'>
          <SignInForm />
          <SignUpForm />
    </div>
  );
};

export default Authentication;
