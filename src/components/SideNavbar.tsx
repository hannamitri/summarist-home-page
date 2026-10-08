"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { RootState } from "@/redux/store";
import {
  FiHome,
  FiBookmark,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

type SideNavbarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideNavbar({ isOpen, onClose }: SideNavbarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
      console.log("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav
        className={`sidebar ${
          pathname.startsWith("/player/") ? "sidebar--player" : ""
        } ${isOpen ? "sidebar--opened" : "sidebar--closed"}`}
      >
        <div className="sidebar__logo">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Summarist"
              width={160}
              height={37}
            />
          </Link>
        </div>

        <div className="sidebar__container">
          <div className="sidebar__top">
            <Link href="/for-you" className="sidebar__item" onClick={onClose}>
              <div className={pathname === "/for-you" ? "sidebar__active" : ""}></div>

              <div className="sidebar__icon">
                <FiHome />
              </div>

              <div className="sidebar__text">For you</div>
            </Link>

            <Link href="/library" className="sidebar__item" onClick={onClose}>
              <div className={pathname === "/library" ? "sidebar__active" : ""}></div>

              <div className="sidebar__icon">
                <FiBookmark />
              </div>

              <div className="sidebar__text">My Library</div>
            </Link>

            <div className="sidebar__item sidebar__item--disabled">
              <div></div>

              <div className="sidebar__icon">
                <FiEdit3 />
              </div>

              <div className="sidebar__text">Highlights</div>
            </div>

            <div className="sidebar__item sidebar__item--disabled">
              <div></div>

              <div className="sidebar__icon">
                <FiSearch />
              </div>

              <div className="sidebar__text">Search</div>
            </div>
          </div>

          <div className="sidebar__bottom">
            <Link href="/settings" className="sidebar__item" onClick={onClose}>
              <div className={pathname === "/settings" ? "sidebar__active" : ""}></div>

              <div className="sidebar__icon">
                <FiSettings />
              </div>

              <div className="sidebar__text">Settings</div>
            </Link>

            <div className="sidebar__item sidebar__item--disabled">
              <div></div>

              <div className="sidebar__icon">
                <FiHelpCircle />
              </div>

              <div className="sidebar__text">Help & Support</div>
            </div>

            <div
              className="sidebar__item"
              onClick={user ? handleLogout : () => dispatch(openAuthModal())}
            >
              <div></div>

              <div className="sidebar__icon">
                <FiLogOut />
              </div>

              <div className="sidebar__text">{user ? "Logout" : "Login"}</div>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="sidebar__overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}