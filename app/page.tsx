"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import "../styles/home.css";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeHero from "../components/home/HomeHero";
import HomeFeatures from "../components/home/HomeFeatures";
import HomeStatistics from "../components/home/HomeStatistics";
import HomeReviews from "../components/home/HomeReviews";
import HomeNumbers from "../components/home/HomeNumbers";
import HomeFooter from "../components/home/HomeFooter";
import AuthModal from "../components/auth/AuthModal";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [shouldRenderAuthModal, setShouldRenderAuthModal] = useState(false);
  const [isAuthModalClosing, setIsAuthModalClosing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = () => {
    if (user) {
      router.push("/for-you");
      return;
    }

    setShouldRenderAuthModal(true);
    setIsAuthModalClosing(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalClosing(true);
  };

  const handleAuthModalClosed = () => {
    setShouldRenderAuthModal(false);
    setIsAuthModalClosing(false);
  };

  return (
    <>
      <HomeNavbar onLoginClick={openAuthModal} />
      <HomeHero onLoginClick={openAuthModal} />
      <HomeFeatures />
      <HomeStatistics />
      <HomeReviews onLoginClick={openAuthModal} />
      <HomeNumbers />
      <HomeFooter />

      {shouldRenderAuthModal && (
        <AuthModal
          isClosing={isAuthModalClosing}
          onClose={closeAuthModal}
          onClosed={handleAuthModalClosed}
        />
      )}
    </>
  );
}