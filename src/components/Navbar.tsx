"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { openAuthModal } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src="/assets/logo.png"
            alt="Summarist logo"
            width={200}
            height={50}
          />
        </figure>

        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={user ? handleLogout : () => dispatch(openAuthModal())}
          >
            {user ? "Logout" : "Login"}
          </li>

          <li className="nav__list nav__list--mobile">About</li>

          <li className="nav__list nav__list--mobile">Contact</li>

          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
