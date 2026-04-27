"use client";

import { useEffect, useState } from "react";
import "../../styles/auth-modal.css";
import GuestLoginButton from "./GuestLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import AuthDivider from "./AuthDivider";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  isClosing: boolean;
  onClose: () => void;
  onClosed: () => void;
}

export default function AuthModal({
  isClosing,
  onClose,
  onClosed,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClosed();
    }
  };

  return (
    <div
      className={`auth-overlay ${isClosing ? "auth-overlay--closing" : ""}`}
      onClick={onClose}
    >
      <div
        className={`auth-modal ${isClosing ? "auth-modal--closing" : ""}`}
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="auth-modal__content">
          <div className="auth-modal__header">
            <h2 className="auth-modal__title">
              {mode === "login" ? "Log in to Summarist" : "Create your account"}
            </h2>

            <button
              type="button"
              className="auth-modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {mode === "login" && (
            <>
              <GuestLoginButton onAuthSuccess={onClose} />
              <AuthDivider />
              <GoogleLoginButton />
              <AuthDivider />
            </>
          )}

          {mode === "login" ? (
            <LoginForm
              onSwitchToRegister={() => setMode("register")}
              onAuthSuccess={onClose}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => setMode("login")}
              onAuthSuccess={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}