import React, { useEffect, useState } from "react";
import { HeaderLogado } from "../HeaderLogado/HeaderLogado";
import axios from "axios";

export function PlaylistUser() {
  const [playlists, setPlaylist] = useState([]);
  const [novaPlaylist, setNovaPlaylist] = useState("");
  const [descricaoPlaylist, setDescricaoPlaylist] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authenticacao");
    if (token) {
      BuscarPlaylistUser(token);
    }
  }, []);

  const BuscarPlaylistUser = async (token) => {
    try {
      const response = await axios.get(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/user/:userId/playlists",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPlaylist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error.response);
    }
  };

  const CriarPlaylist = async (token) => {
    const body = {
      userId: localStorage.getItem("authorizacao"),
      songs: [""],
      description: descricaoPlaylist,
      name: novaPlaylist,
    };

    try {
      const response = await axios.post(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist",
        body,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPlaylist((plays) => [...plays, response.data]);
      setNovaPlaylist("");
      setDescricaoPlaylist("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const onChangePlaylist = (e) => {
    setNovaPlaylist(e.target.value);
  };

  const onChangeDescricao = (e) => {
    setDescricaoPlaylist(e.target.value);
  };

  const onClickBotao = () => {
    const token = localStorage.getItem("authenticacao");
    if (token) CriarPlaylist(token);
  };

  return (
    <div>
      <HeaderLogado />
      <h1>Minhas Playlists</h1>
      <ul>
        {Array.isArray(playlists) &&
          playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
      </ul>
      <input
        type="text"
        value={novaPlaylist}
        onChange={onChangePlaylist}
        placeholder="Nome da nova playlist"
      />
      <input
        type="text"
        value={descricaoPlaylist}
        onChange={onChangeDescricao}
        placeholder="Descrição da nova playlist"
      />
      <button onClick={onClickBotao}>Criar Playlist</button>
    </div>
  );
}
