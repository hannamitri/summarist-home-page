"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInAnonymously } from "firebase/auth";
import { FaUser } from "react-icons/fa";
import { auth } from "../../lib/firebase";

interface GuestLoginButtonProps {
  onAuthSuccess: () => void;
}

export default function GuestLoginButton({
  onAuthSuccess,
}: GuestLoginButtonProps) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGuestLogin = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInAnonymously(auth);
      onAuthSuccess();

      setTimeout(() => {
        router.push("/for-you");
      }, 220);
    } catch {
      setErrorMessage("Guest login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="auth-guest-btn"
        onClick={handleGuestLogin}
        disabled={isSubmitting}
      >
        <span className="auth-guest-btn__icon-box">
          <FaUser size={18} />
        </span>

        <span className="auth-guest-btn__text">
          {isSubmitting ? "Logging in..." : "Login as a Guest"}
        </span>
      </button>

      {errorMessage && <p className="auth-error-message">{errorMessage}</p>}
    </>
  );
}