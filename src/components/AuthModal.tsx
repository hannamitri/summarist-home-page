"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { closeAuthModal, setAuthMode } from "../redux/authSlice";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

export default function AuthModal() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthModalOpen, authMode } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isAuthModalOpen) {
    return null;
  }

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (authMode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful!");
      }

      dispatch(closeAuthModal());

      if (pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Guest login successful!");

      dispatch(closeAuthModal());

      if (pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      console.error("Guest login failed:", error);
    }
  };

  return (
    <div className="auth__modal--overlay">
      <div className="auth__modal">
        <button
          className="auth__modal--close"
          onClick={() => dispatch(closeAuthModal())}
        >
          ×
        </button>

        <h2>{authMode === "login" ? "Log in" : "Create your account"}</h2>

        <p>
          {authMode === "login"
            ? "Log in to continue using Summarist."
            : "Create an account to get started with Summarist."}
        </p>

        <form onSubmit={handleSubmit}>
          {authMode === "register" && (
            <input type="text" name="name" placeholder="Name" required />
          )}

          <input type="email" name="email" placeholder="Email" required />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit" className="btn">
            {authMode === "login" ? "Log in" : "Register"}
          </button>
        </form>

        <button
          type="button"
          className="auth__modal--switch"
          onClick={() =>
            dispatch(setAuthMode(authMode === "login" ? "register" : "login"))
          }
        >
          {authMode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Log in"}
        </button>

        {authMode === "login" && (
          <button
            type="button"
            className="auth__modal--guest"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
        )}
      </div>
    </div>
  );
}
