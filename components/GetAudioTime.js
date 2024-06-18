"use client";
import React, { useEffect, useRef, useState } from "react";

export default function GetAudioTime({ audioLink }) {
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
      };

      const audioElement = audioRef.current;
      audioElement.addEventListener("loadedmetadata", onLoadedMetadata);

      return () => {
        audioElement.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }
  }, [audioLink]);

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
    <>
      <div>
      <audio ref={audioRef} src={audioLink}/>
        <div>
          <div>{formatTime(duration)}</div>
        </div>
      </div>
    </>
  );
}
