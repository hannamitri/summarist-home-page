"use client"

import { auth } from "@/lib/firebase";
import { openAuthModal } from "@/redux/authSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function Reviews() {
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
    <section id="reviews">
      <div className="row">
        <div className="container">
          <div className="section__title">What our members say</div>

          <div className="reviews__wrapper">
            <div className="review">
              <div className="review__header">
                <div className="review__name">Hanna M.</div>

                <div className="review__stars">
                  <BsStarFill />
                </div>
              </div>

              <div className="review__body">
                This app has been a <b>game-changer</b> for me! It&apos;s
                saved me so much time and effort in reading and
                comprehending books. Highly recommend it to all book
                lovers.
              </div>
            </div>

            <div className="review">
              <div className="review__header">
                <div className="review__name">David B.</div>

                <div className="review__stars">
                  <BsStarFill />
                </div>
              </div>

              <div className="review__body">
                I love this app! It provides{" "}
                <b>concise and accurate summaries</b> of books in a
                way that is easy to understand. It&apos;s also very
                user-friendly and intuitive.
              </div>
            </div>

            <div className="review">
              <div className="review__header">
                <div className="review__name">Nathan S.</div>

                <div className="review__stars">
                  <BsStarFill />
                </div>
              </div>

              <div className="review__body">
                This app is a great way to get the main takeaways
                from a book without having to read the entire thing.
                <b>The summaries are well-written and informative.</b>{" "}
                Definitely worth downloading.
              </div>
            </div>

            <div className="review">
              <div className="review__header">
                <div className="review__name">Ryan R.</div>

                <div className="review__stars">
                  <BsStarFill />
                </div>
              </div>

              <div className="review__body">
                If you&apos;re a busy person who{" "}
                <b>loves reading but doesn&apos;t have the time</b> to read
                every book in full, this app is for you! The summaries
                are thorough and provide a great overview of the book&apos;s
                content.
              </div>
            </div>
          </div>

          <div className="reviews__btn--wrapper">
<button
  className="btn home__cta--btn"
  onClick={user ? handleLogout : () => dispatch(openAuthModal())}
>
  {user ? "Logout" : "Login"}
</button>
          </div>
        </div>
      </div>
    </section>
  );
}