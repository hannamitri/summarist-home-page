"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Landing() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>

              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>

              <button
                className="btn home__cta--btn"
                onClick={user ? handleLogout : () => dispatch(openAuthModal())}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>

            <figure className="landing__image--mask">
              <Image
                src="/assets/landing.png"
                alt="landing"
                width={400}
                height={400}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
