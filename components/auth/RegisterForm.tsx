"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Button from "../ui/Button";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onAuthSuccess: () => void;
}

function getRegisterErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function RegisterForm({
  onSwitchToLogin,
  onAuthSuccess,
}: RegisterFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

      setErrorMessage(getRegisterErrorMessage(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleRegister}>
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
  {isSubmitting ? "Creating..." : "Create your account"}
</Button>
      </form>

      <div className="auth-links">
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          Already have an account?
        </button>
      </div>
    </>
  );
}