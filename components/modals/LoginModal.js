"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Snackbar, Alert } from "@mui/material";
import { BiX } from "react-icons/bi";

import { closeLoginModal, openSignupModal } from "@/redux/modalSlice";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/firebase";

export default function LoginModal({ onLoginSuccess }) {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSignIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeLoginModal());
      onLoginSuccess();
    } catch (error) {
      setError("Invalid Email/Password");
    }
  }

  async function handleGuestSignIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "guest12345@gmail.com",
        "123456"
      );
      const user = userCredential.user;
      console.log("guest logged in successfully: ", user.uid);

      dispatch(closeLoginModal());
      onLoginSuccess();
    } catch (error) {
      console.error("error signing in as guest: ", error.message);
      setError(error.message);
    }
  }

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
            <BiX onClick={() => dispatch(closeLoginModal())} />
          </div>
          <div className="modal__auth">
            <h1 className="modal__title">Log in to Summarist</h1>
            <button
              className="btn modal__btn--guest"
              onClick={handleGuestSignIn}
            >
              <div>Login as a Guest</div>
            </button>
            <div className="modal__separator">
              <span className="modal__separator--text">or</span>
            </div>
            <form className="modal__input--wrapper">
              <input
                className="modal__input"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="modal__input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </form>
            <button class="btn modal__login--btn" onClick={handleSignIn}>
              <span>Login</span>
            </button>
          </div>

          <button
            className="btn modal__btn"
            onClick={() => {
              dispatch(openSignupModal());
              dispatch(closeLoginModal());
            }}
          >
            Don&apos;t have an account?
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
