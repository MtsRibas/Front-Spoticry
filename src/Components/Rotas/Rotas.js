import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { PlaylistUser } from "../PlaylistsUser/PlaylistUser";
import { MusicUser } from "../MusicUser/MusicUser";

const Router = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/playlists" element={<PlaylistUser />} />
    <Route path="/musics" element={<MusicUser />} />
  </Routes>
);

export default Router;
