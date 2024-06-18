"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, Snackbar } from "@mui/material";
import { BiX } from "react-icons/bi";
import { closeSignupModal, openLoginModal } from "@/redux/modalSlice";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSignUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      dispatch(closeSignupModal());
    } catch (error) {
      if (!email || !emailRegex.test(email)) {
        setError("invalid email");
        return;
      }
      if (password.length < 6) {
        setError("Password must be a minimum of 6 characters");
        return;
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

  return (
    <>
      <Modal open={isOpen} className="modal">
        <div className="modal__block">
          <div className="close__modal--btn">
            <BiX onClick={() => dispatch(closeSignupModal())} />
          </div>
          <div className="modal__auth">
            <h1 className="modal__title">Sign up to Summarist</h1>

            <form className="modal__input--wrapper">
              <input
                className="modal__input"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <input
                className="modal__input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </form>
            <button class="btn modal__login--btn" onClick={handleSignUp}>
              <span>Sign up</span>
            </button>
          </div>

          <button
            className="btn modal__btn"
            onClick={() => {
              dispatch(openLoginModal());
              dispatch(closeSignupModal());
            }}
          >
            Already have an account?
          </button>
        </div>
      </Modal>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
