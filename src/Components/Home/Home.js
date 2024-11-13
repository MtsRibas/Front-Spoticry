import React, { useState, useEffect } from "react";
import { HeaderLogado } from "../HeaderLogado/HeaderLogado";
import axios from "axios";
import styled from "styled-components";
import foguinho from "../img/fireIcon.svg";
import { NavTeste } from "../NavTeste/NavTeste";
import { Colors } from "../Colors/Colors";

//estilos

const Banner = styled.div`
  display: flex;
  background: url("https://www.designi.com.br/images/preview/10902675.jpg")
    no-repeat center;
  background-size: cover;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;
const DivNomeBotao = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  color: ${Colors.Branco};
`;
const Botao = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 48px;
  border-radius: 32px;
  margin: 5px 0px;
  background-color: ${Colors.Cinza};
  color: ${Colors.Branco};
  &:hover {
    background-color: ${Colors.Laranja};
    color: ${Colors.Preto};
    cursor: pointer;
  }
`;
const TituloMusic = styled.p`
  font-size: 28px;
  margin: 0px;
`;
const DivPlaylists = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;
const CardPlaylist = styled.div`
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 10px;
  color: ${Colors.Branco};
  &:hover {
    border: 1px solid #${Colors.Cinza};
    background-color: ${Colors.Cinza};
    cursor: pointer;
  }
`;
const Fotinha = styled.div`
  justify-content: center;
  align-items: center;
`;
const Pikachu = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 10px;
`;
const PlaylistTudo = styled.div`
  margin-top: 80px;
`;
const PlaylistTudo2 = styled.div`
  margin-top: 80px;
`;
const BotaoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;
const Botao1 = styled.button`
  padding: 5px 30px;
  background-color: black;
  border: none;
  background-color: transparent;
  color: ${Colors.Branco};
  &:hover {
    cursor: pointer;
    color: ${Colors.Branco};
  }
`;
const DivBanner = styled.div``;
const TituloPlaylists = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Ajustes = styled.div`
  display: flex;
  flex-direction: row;
`;

export function Home() {
  const [playlist, setPlaylist] = useState([]);
  const [popularSong, setPopularSong] = useState(null);
  const [paginaAtualEmAlta, setPaginaAtualEmAlta] = useState(1);
  const [paginaAtualUltimasMusicas, setPaginaAtualUltimasMusicas] = useState(1);
  const playlistPorPagina = 4;

  useEffect(() => {
    const token = localStorage.getItem("authenticacao");
    const idMusic = "90463ec7-e6b2-418d-8a24-f38f77885ccb";

    if (token) {
      Playlist(token);
      pop(token, idMusic);
    }
  }, []);

  const Playlist = async (token) => {
    try {
      const response = await axios.get(
        `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      setPlaylist(response.data.playlists);
    } catch (error) {
      console.log(error.response);
    }
  };

  const pop = async (token, idMusic) => {
    try {
      const response = await axios.get(
        `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${idMusic}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPopularSong(response.data.song);
    } catch (error) {
      console.log("Erro ao buscar a música popular:", error.response);
    }
  };

  const proxPagEmAlta = () => {
    if (paginaAtualEmAlta * playlistPorPagina < playlist.length) {
      setPaginaAtualEmAlta(paginaAtualEmAlta + 1);
    }
  };
  const pageAnteriorEmAlta = () => {
    if (paginaAtualEmAlta > 1) {
      setPaginaAtualEmAlta(paginaAtualEmAlta - 1);
    }
  };
  const inicioIndexEmAlta = (paginaAtualEmAlta - 1) * playlistPorPagina;
  const finalIndexEmAlta = inicioIndexEmAlta + playlistPorPagina;

  const playlistEmAlta = playlist.filter(
    (play, index) => index >= inicioIndexEmAlta && index < finalIndexEmAlta
  );

  // funcoes para a segunda parte das playlists ultimas musicas tocadas
  const proxPagUltimasMusicas = () => {
    if (paginaAtualUltimasMusicas * playlistPorPagina < playlist.length) {
      setPaginaAtualUltimasMusicas(paginaAtualUltimasMusicas + 1);
    }
  };
  const pageAnteriorUltimasMusicas = () => {
    if (paginaAtualUltimasMusicas > 1) {
      setPaginaAtualUltimasMusicas(paginaAtualUltimasMusicas - 1);
    }
  };
  const inicioIndexUltimasMusicas =
    (paginaAtualUltimasMusicas - 1) * playlistPorPagina;
  const finalIndexUltimasMusicas =
    inicioIndexUltimasMusicas + playlistPorPagina;

  const playlistUltimasMusicas = playlist.filter(
    (play, index) =>
      index >= inicioIndexUltimasMusicas && index < finalIndexUltimasMusicas
  );

  const totalPagina = parseInt(playlist.length / playlistPorPagina + 1);

  return (
    <div>
      <HeaderLogado />
      <NavTeste playlist={playlist} />
      <h1>
        <span>
          <img src={foguinho} alt="fogo" />
        </span>
        Música popular
      </h1>
      <DivBanner>
        <Banner />

        {popularSong && (
          <DivNomeBotao>
            <TituloMusic>{popularSong.title}</TituloMusic>
            <Botao>Play</Botao>
          </DivNomeBotao>
        )}
      </DivBanner>

      <PlaylistTudo>
        <TituloPlaylists>
          <Ajustes>
            <img src={foguinho} alt="iconeFogo" />
            <h1>Em alta</h1>
          </Ajustes>

          <BotaoContainer>
            <Botao1
              onClick={pageAnteriorEmAlta}
              disabled={paginaAtualEmAlta === 1}
            >
              ←
            </Botao1>
            <p>
              {paginaAtualEmAlta} / {totalPagina}
            </p>

            <Botao1
              onClick={proxPagEmAlta}
              disabled={
                paginaAtualEmAlta * playlistPorPagina >= playlist.length
              }
            >
              →
            </Botao1>
          </BotaoContainer>
        </TituloPlaylists>

        <DivPlaylists>
          {playlistEmAlta.map((playlist) => (
            <CardPlaylist key={playlist._id}>
              <Fotinha>
                <Pikachu
                  src="https://www.designi.com.br/images/preview/10902675.jpg"
                  alt="Imagem card"
                />
              </Fotinha>
              <h3> {playlist._name}</h3>
              <p> {playlist._description}</p>
            </CardPlaylist>
          ))}
        </DivPlaylists>
      </PlaylistTudo>

      <PlaylistTudo2>
        <TituloPlaylists>
          <Ajustes>
            <img src={foguinho} alt="iconeFogo" />
            <h1>Últimas músicas tocadas</h1>
          </Ajustes>

          <BotaoContainer>
            <Botao1
              onClick={pageAnteriorUltimasMusicas}
              disabled={paginaAtualUltimasMusicas === 1}
            >
              ←
            </Botao1>
            <p>
              {paginaAtualUltimasMusicas} / {totalPagina}
            </p>

            <Botao1
              onClick={proxPagUltimasMusicas}
              disabled={
                paginaAtualUltimasMusicas * playlistPorPagina >= playlist.length
              }
            >
              →
            </Botao1>
          </BotaoContainer>
        </TituloPlaylists>

        <DivPlaylists>
          {playlistUltimasMusicas.map((playlist) => (
            <CardPlaylist key={playlist._id}>
              <Fotinha>
                <Pikachu
                  src="https://www.designi.com.br/images/preview/10902675.jpg"
                  alt="pokemon"
                />
              </Fotinha>
              <h3> {playlist._name}</h3>
              <p> {playlist._description}</p>
            </CardPlaylist>
          ))}
        </DivPlaylists>
      </PlaylistTudo2>
    </div>
  );
}
