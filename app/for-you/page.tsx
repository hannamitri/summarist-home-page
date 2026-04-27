"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function ForYouPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (isLoading) {
    return (
      <main style={{ padding: "40px 24px" }}>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px 24px" }}>
      <h1>For You</h1>
      <p>
        {user?.isAnonymous
          ? "You are logged in as a guest."
          : `You are logged in as ${user?.email}.`}
      </p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "16px",
          height: "40px",
          padding: "0 16px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#2bd97c",
          color: "#032b41",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </main>
  );
}