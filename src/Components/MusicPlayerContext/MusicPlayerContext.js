// src/context/MusicPlayerContext.js
import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [playing, setPlaying] = useState(false);

  const handleMusicSelect = (url) => {
    setCurrentUrl(url);
    setPlaying(true);
  };

  return (
    <MusicPlayerContext.Provider
      value={{ currentUrl, playing, setPlaying, handleMusicSelect }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
