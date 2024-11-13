import React, { useState, useEffect } from "react";
import { HeaderLogado } from "../HeaderLogado/HeaderLogado";
import axios from "axios";
import styled from "styled-components";
import foguinho from "../img/fireIcon.svg";
import { NavTeste } from "../NavTeste/NavTeste";
import { Colors } from "../Colors/Colors";



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
  const [playlistsEmAlta, setPlaylistsEmAlta] = useState([]);
  const [playlistsUltimasMusicas, setPlaylistsUltimasMusicas] = useState([]);
  const [popularSong, setPopularSong] = useState(null);
  const [paginaAtualEmAlta, setPaginaAtualEmAlta] = useState(1);
  const [paginaAtualUltimasMusicas, setPaginaAtualUltimasMusicas] = useState(1);

  const playlistPorPaginaEmAlta = 4;
  const playlistPorPaginaUltimasMusicas = 4;
  const totalPaginasEmAlta = 5;
  const totalPaginasUltimasMusicas = 4;

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

      const allPlaylists = response.data.playlists;

      setPlaylistsEmAlta(allPlaylists.slice(0, 20));
      setPlaylistsUltimasMusicas(allPlaylists.slice(21, 40));
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

  // Funções de paginação para "Em Alta"
  const proxPagEmAlta = () => {
    if (paginaAtualEmAlta < totalPaginasEmAlta) {
      setPaginaAtualEmAlta(paginaAtualEmAlta + 1);
    }
  };
  const pageAnteriorEmAlta = () => {
    if (paginaAtualEmAlta > 1) {
      setPaginaAtualEmAlta(paginaAtualEmAlta - 1);
    }
  };


  const proxPagUltimasMusicas = () => {
    if (paginaAtualUltimasMusicas < totalPaginasUltimasMusicas) {
      setPaginaAtualUltimasMusicas(paginaAtualUltimasMusicas + 1);
    }
  };
  const pageAnteriorUltimasMusicas = () => {
    if (paginaAtualUltimasMusicas > 1) {
      setPaginaAtualUltimasMusicas(paginaAtualUltimasMusicas - 1);
    }
  };

  return (
    <div>
      <HeaderLogado />
      <NavTeste playlist={playlistsEmAlta.concat(playlistsUltimasMusicas)} />
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

      {/* Seção "Em Alta" */}
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
              {paginaAtualEmAlta} / {totalPaginasEmAlta}
            </p>
            <Botao1
              onClick={proxPagEmAlta}
              disabled={paginaAtualEmAlta >= totalPaginasEmAlta}
            >
              →
            </Botao1>
          </BotaoContainer>
        </TituloPlaylists>
        <DivPlaylists>
          {playlistsEmAlta
            .filter(
              (_, index) =>
                index >= (paginaAtualEmAlta - 1) * playlistPorPaginaEmAlta &&
                index < paginaAtualEmAlta * playlistPorPaginaEmAlta
            )
            .map((playlist) => (
              <CardPlaylist key={playlist._id}>
                <Fotinha>
                  <Pikachu
                    src="https://www.designi.com.br/images/preview/10902675.jpg"
                    alt="Imagem card"
                  />
                </Fotinha>
                <h3>{playlist._name}</h3>
                <p>{playlist._description}</p>
              </CardPlaylist>
            ))}
        </DivPlaylists>
      </PlaylistTudo>

      {/* Seção "Últimas Músicas Tocadas" */}
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
              {paginaAtualUltimasMusicas} / {totalPaginasUltimasMusicas}
            </p>
            <Botao1
              onClick={proxPagUltimasMusicas}
              disabled={paginaAtualUltimasMusicas >= totalPaginasUltimasMusicas}
            >
              →
            </Botao1>
          </BotaoContainer>
        </TituloPlaylists>
        <DivPlaylists>
          {playlistsUltimasMusicas
            .filter(
              (_, index) =>
                index >=
                  (paginaAtualUltimasMusicas - 1) *
                    playlistPorPaginaUltimasMusicas &&
                index <
                  paginaAtualUltimasMusicas * playlistPorPaginaUltimasMusicas
            )
            .map((playlist) => (
              <CardPlaylist key={playlist._id}>
                <Fotinha>
                  <Pikachu
                    src="https://www.designi.com.br/images/preview/10902675.jpg"
                    alt="pokemon"
                  />
                </Fotinha>
                <h3>{playlist._name}</h3>
                <p>{playlist._description}</p>
              </CardPlaylist>
            ))}
        </DivPlaylists>
      </PlaylistTudo2>
    </div>
  );
}
