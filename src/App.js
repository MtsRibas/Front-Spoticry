// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./Components/Home/Home";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Login } from "./Components/Login/Login";
import { PlaylistUser } from "./Components/PlaylistsUser/PlaylistUser";
import { MusicUser } from "./Components/MusicUser/MusicUser";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Colors } from "./Components/Colors/Colors";

const Page = styled.div`
  padding: 10px 210px;
  background-color: black;
  color: ${Colors.Branco};
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authenticacao")
  );

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <BrowserRouter>
      <Page>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login Logando={handleLogin} />} />
          <Route
            path="/home"
            element={
              <PrivateRoute element={<Home />} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/playlists"
            element={
              <PrivateRoute
                element={<PlaylistUser />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/musics"
            element={
              <PrivateRoute element={<MusicUser />} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Page>
    </BrowserRouter>
  );
}

export default App;
