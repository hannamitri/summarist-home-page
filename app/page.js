"use client";
import React from "react";
import Landing from "@/components/Landing";
import LoginModal from "@/components/modals/LoginModal";
import SignupModal from "@/components/modals/SignupModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/foryou"); // Example redirection after login
  };

  return (
    <>
      <Landing />
      <LoginModal onLoginSuccess={handleLoginSuccess} />
      <SignupModal />
    </>
  );
}
