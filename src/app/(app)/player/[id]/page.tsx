"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GrBackTen, GrForwardTen } from "react-icons/gr";
import { FaPlay, FaPause } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
type Book = {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  imageLink: string;
  audioLink: string;
  summary: string;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const { id } = await params;

      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleEnded = async () => {
      setIsPlaying(false);

      const currentUser = auth.currentUser;

      if (!currentUser || !book) return;

      try {
        await setDoc(
          doc(db, "users", currentUser.uid, "finishedBooks", book.id),
          book,
        );

        console.log("Book added to finished books");
      } catch (error) {
        console.error("Error saving finished book:", error);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [book]);

  if (loading) {
    return (
      <main className="player-page">
        <section className="player__container">
          <div className="player__skeleton-content">
            <div className="skeleton__line skeleton__line--title"></div>

            <div className="skeleton__summary">
              <div className="skeleton__line"></div>
              <div className="skeleton__block"></div>
              <div className="skeleton__block"></div>
              <div className="skeleton__block"></div>
            </div>
          </div>
        </section>

        <div className="audio__container">
          <div className="audio-book__section">
            <div className="skeleton__audio-image"></div>

            <div className="audio-book__details">
              <div className="skeleton__audio-title"></div>
              <div className="skeleton__audio-author"></div>
            </div>
          </div>

          <div className="audio__wrapper">
            <div className="audio__controls">
              <div className="skeleton__audio-button"></div>
              <div className="skeleton__audio-play"></div>
              <div className="skeleton__audio-button"></div>
            </div>
          </div>

          <div className="audio__progress">
            <div className="skeleton__audio-time"></div>
            <div className="skeleton__audio-bar"></div>
            <div className="skeleton__audio-time"></div>
          </div>
        </div>
      </main>
    );
  }
  if (!book) {
    return <p>Loading...</p>;
  }
  return (
    <main className="player-page">
      <section className="player__container">
        <div>
          <h2 className="player__title">{book.title}</h2>
          <p className="player__summary">{book.summary}</p>
        </div>

        <div className="audio__container">
          <div className="audio-book__section">
            <Image
              src={book.imageLink}
              alt={book.title}
              width={80}
              height={80}
            />
            <div className="audio-book__details">
              <p>{book.title}</p>
              <p className="audio__author">{book.author}</p>
            </div>
          </div>

          <div className="audio__wrapper">
            <div className="audio__controls">
              <button type="button" onClick={handleRewind}>
                <GrBackTen className="forward__rewind" />
              </button>

              <button
                className="play__pauseButton"
                type="button"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <FaPause className="icon__details" />
                ) : (
                  <FaPlay className="icon__details play__btn" />
                )}
              </button>

              <button type="button" onClick={handleForward}>
                <GrForwardTen className="forward__rewind" />
              </button>
            </div>
          </div>

          <div className="audio__progress">
            <span className="audio__time">{formatTime(currentTime)}</span>

            <input
              className="time__bar"
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Number(e.target.value);
                }
              }}
            />
            <span className="audio__time">{formatTime(duration)}</span>
          </div>

          <audio ref={audioRef} src={book.audioLink} />
        </div>
      </section>
    </main>
  );
}
