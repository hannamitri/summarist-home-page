"use client";

import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/firebase";

export default function BookPage() {
  const { bookId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const isLoginModalOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookId) {
      console.error("No bookId provided");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
      )
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, [bookId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [isPlaying, audioRef, repeat]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   function handleLoginSuccess() {
  //     router.push(`/player/${bookId}`);
  //     console.log("success");
  //   }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleProgressChange = () => {
    const currentTime = progressBarRef.current.value;
    audioRef.current.currentTime = currentTime;

    const progressPercentage = (currentTime / duration) * 100;
    progressBarRef.current.style.background = `linear-gradient(to right, rgb(43, 217, 124) ${progressPercentage}%, rgb(109, 120, 125) ${progressPercentage}%)`;
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
    console.log(seconds);
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="summary">
      <div className="audio__book--summary" style={{ fontSize: "16px" }}>
        <div className="audio__book--summary-title">
          <b>{books.title}</b>
        </div>
        <div class="audio__book--summary-text">{books.summary}</div>
      </div>
      <div className="audio__wrapper">
        <audio
          ref={audioRef}
          src={books.audioLink}
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        <div className="audio__track--wrapper">
          <figure className="audio__track--image-mask">
            <figure
              className="book__image--wrapper"
              style={{ height: "48px", width: "48px", minWidth: "48px" }}
            >
              <img
                className="book__image"
                style={{ display: "block" }}
                src={books.imageLink}
                alt="book"
              />
            </figure>
          </figure>
          <div className="audio__track--details-wrapper">
            <div className="audio__track--title">{books.title}</div>
            <div className="audio__track--author">{books.author}</div>
          </div>
        </div>

        <div className="audio__controls--wrapper">
          <div className="audio__controls">
            <button onClick={skipBackward} className="audio__controls--btn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-width="2"
                  d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
            <button
              onClick={togglePlayPause}
              class="audio__controls--btn audio__controls--btn-play"
            >
              {isPlaying ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224 432h-80V80h80zm144 0h-80V80h80z"></path>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="audio__controls--play-icon"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 448l320-192L96 64v384z"></path>
                </svg>
              )}
            </button>

            <button onClick={skipForward} class="audio__controls--btn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-width="2"
                  d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">{formatTime(timeProgress)}</div>
          <input
            type="range"
            ref={progressBarRef}
            onChange={handleProgressChange}
            class="audio__progress--bar"
            value="0"
            max="204.025958"
          ></input>
          <div class="audio__time">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
