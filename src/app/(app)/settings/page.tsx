"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  getCurrentUserSubscriptions,
  Subscription,
} from "@invertase/firestore-stripe-payments";
import { payments } from "@/lib/stripePayments";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/authSlice";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const subscriptions = await getCurrentUserSubscriptions(payments, {
            status: "active",
          });

          setSubscription(subscriptions[0] || null);
        } catch (error) {
          console.error("Error loading subscription:", error);
          setSubscription(null);
        }
      } else {
        setSubscription(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
      }, []);

      if (loading) {
  return (
    <div className="container">
      <main className="settings-page">
        <h1 className="settings__title">Settings</h1>

        <div className="settings__skeleton">
          <div className="skeleton__line skeleton__line--short"></div>
          <div className="skeleton__line skeleton__line--long"></div>

          <div className="settings__skeleton--account">
            <div className="skeleton__line skeleton__line--short"></div>
            <div className="skeleton__line skeleton__line--long"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

  if (!user) {
    return (
    <div className="container">
  <main className="settings-page">
    <h1 className="settings__title">Settings</h1>

    <div className="settings__login--Wrapper">
      <Image
        width={400}
        height={276}
        alt="settings"
        src="/assets/login.png"
      />

      <div className="settings-item">
        <span className="settings__loginText">
          Log in to your account to see your details.
        </span>

        <button className="btn settings_btn" type="button" onClick={ () => dispatch(openAuthModal())}>
          Login
        </button>
      </div>
    </div>
  </main>
</div>
    );
  }

  return (
    <div className="container">
      <main className="settings-page">
        <h1 className="settings__title">Settings</h1>

        <section className="settings__plan">
          <h1 className="subscription__title">Your Subscription plan</h1>

          <div className="subscription__text">
            {subscription ? (
              <span>Premium / Monthly</span>
            ) : (
              <>
                <span>Basic</span>

                <button
                  className="btn"
                  type="button"
                  onClick={() => router.push("/choose-plan")}
                >
                  Upgrade
                </button>
              </>
            )}
          </div>
        </section>

        <section className="settings__account">
          <h2 className="account__title">Account</h2>

          <div className="account__text">
            <span>Email: </span>
            <span>{user.email || "Not signed in"}</span>
          </div>
        </section>
      </main>
    </div>
  );
}
