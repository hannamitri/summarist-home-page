"use client";

import { useState } from "react";
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
  const [shouldRenderAuthModal, setShouldRenderAuthModal] = useState(false);
  const [isAuthModalClosing, setIsAuthModalClosing] = useState(false);

  const openAuthModal = () => {
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