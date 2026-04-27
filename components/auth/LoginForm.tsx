"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Button from "../ui/Button";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onAuthSuccess: () => void;
}

function getLoginErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function LoginForm({
  onSwitchToRegister,
  onAuthSuccess,
}: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthSuccess();

      setTimeout(() => {
        router.push("/for-you");
      }, 220);
    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
          ? (error as { code: string }).code
          : "";

      setErrorMessage(getLoginErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorMessage && <p className="auth-error-message">{errorMessage}</p>}

        <Button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
  {isSubmitting ? "Logging in..." : "Login"}
</Button>
      </form>

      <div className="auth-links">
        <button type="button" className="auth-link">
          Forgot your password?
        </button>
      </div>

      <div className="auth-modal__footer">
        <button type="button" className="auth-link" onClick={onSwitchToRegister}>
          Don&apos;t have an account?
        </button>
      </div>
    </>
  );
}