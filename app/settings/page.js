"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Settings = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const idToken = await user.getIdToken();
        // Fetch subscription details from your backend
        const res = await fetch('/api/get-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        });
        const data = await res.json();
        setSubscription(data.subscription);
      } else {
        setUser(null);
        setSubscription(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Settings</h1>
        <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
          Please login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Email: {user.email}</p>
      <p>Subscription Status: {subscription ? subscription.status : 'No Subscription Found'}</p>
    </div>
  );
};

export default Settings;