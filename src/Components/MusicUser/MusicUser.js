import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../Colors/Colors";
import { HeaderLogado } from "../HeaderLogado/HeaderLogado";
import { ModalMusic } from "../MusicUser/ModalMusic";
import axios from "axios";
import adicionar from "../img/adicionar.svg";
import foguinho from "../img/fireIcon.svg";
import detalheModal from "../img/btnIcon.svg";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { NavTeste } from "../NavTeste/NavTeste";

const Tudo = styled.div`
  background-color: ${Colors.Preto};
  max-height: 100%;
  display: flex;
`;

const ConteudoPrincipal = styled.div`
  flex: 1;
`;

const PlayerWrapper = styled.div`
  width: 30px;
`;

const Titulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BotaoAdicionar = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Separacao = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
  text-align: center;
  gap: 10px;
`;

const Input = styled.input`
  background-color: ${Colors.Cinza};
  padding: 21px;
  border-radius: 16px;
  color: ${Colors.Branco};
`;

const TituloModal = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const BotaoEnviar = styled.button`
  position: absolute;
  bottom: 25px;
  right: 31%;
  background-color: ${Colors.Cinza};
  border: none;
  border-radius: 32px;
  padding: 16px 48px;
  color: ${Colors.Branco};
  &:hover {
    background-color: ${Colors.Laranja};
    cursor: pointer;
    color: ${Colors.Preto};
  }
`;

const FiltroContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const BotaoReproduzir = styled.button`
  background-color: ${Colors.Laranja};
  color: ${Colors.Preto};
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Preto};
    color: ${Colors.Laranja};
  }
`;

export function MusicUser() {
  const [musicas, setMusicas] = useState([]);
  const [filteredMusicas, setFilteredMusicas] = useState([]);
  const [modalMusicOpen, setModalMusicOpen] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [filtro, setFiltro] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [playing, setPlaying] = useState(false);

  const buscarTodasMusicas = async () => {
    const token = localStorage.getItem("authenticacao");
    try {
      const response = await axios.get(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song",
        { headers: { Authorization: token } }
      );
      setMusicas(response.data.songs);
      setFilteredMusicas(response.data.songs);
    } catch (error) {
      console.error(
        "Erro ao buscar todas as músicas:",
        error.response || error.message
      );
      if (error.response && error.response.data.error === "Token expired") {
        alert("Sua sessão expirou. Por favor, faça login novamente.");
        localStorage.removeItem("authenticacao");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    buscarTodasMusicas();
  }, []);

  useEffect(() => {
    const filtered = musicas.filter((musica) => {
      if (filtro === "all") {
        return (
          musica.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          musica.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return musica[filtro]?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredMusicas(filtered);
  }, [filtro, searchTerm, musicas]);

  const saveSong = async () => {
    const token = localStorage.getItem("authenticacao");
    const songData = { title: songTitle, artist, url };
    try {
      const response = await axios.post(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song",
        songData,
        { headers: { Authorization: token } }
      );
      setMusicas((prev) => [...prev, response.data]);
      setSongTitle("");
      setArtist("");
      setUrl("");
      setModalMusicOpen(false);
    } catch (error) {
      console.error(
        "Erro ao adicionar música:",
        error.response || error.message
      );
    }
  };

  const handleMusicSelect = (url) => {
    setCurrentUrl(url);
    setPlaying(true);
  };

  return (
    <Tudo>
      <NavTeste />
      <ConteudoPrincipal>
        <HeaderLogado />
        <Titulo>
          <h1>
            <span>
              <img src={foguinho} alt="icone de fogo" />
            </span>
            Minhas Músicas
          </h1>
          <BotaoAdicionar onClick={() => setModalMusicOpen(true)}>
            <img src={adicionar} alt="Adicionar Música" />
          </BotaoAdicionar>
        </Titulo>

        <FiltroContainer>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="all">Todos</option>
            <option value="title">Título</option>
            <option value="artist">Artista</option>
          </select>
          <input
            type="text"
            placeholder="Digite para filtrar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FiltroContainer>

        <div>
          {filteredMusicas.length > 0 ? (
            <ul>
              {filteredMusicas.map((musica, index) => (
                <li key={index}>
                  <h3>{musica.title}</h3>
                  <p>Artista: {musica.artist}</p>
                  <BotaoReproduzir
                    onClick={() => handleMusicSelect(musica.url)}
                  >
                    Reproduzir
                  </BotaoReproduzir>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma música encontrada</p>
          )}
        </div>
      </ConteudoPrincipal>

      <PlayerWrapper>
        <MusicPlayer
          url={currentUrl}
          playing={playing}
          setPlaying={setPlaying}
        />
      </PlayerWrapper>

      <ModalMusic
        aberto={modalMusicOpen}
        fechado={() => setModalMusicOpen(false)}
        conteudoModal={
          <>
            <TituloModal>
              <img src={detalheModal} alt="Icone músicas" />
              <h2>Adicionar Música</h2>
            </TituloModal>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Separacao>
                <label>Título</label>
                <Input
                  type="text"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  placeholder="Título da Música"
                />
              </Separacao>
              <Separacao>
                <label>Artista</label>
                <Input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Artista"
                />
              </Separacao>
              <Separacao>
                <label>URL</label>
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="URL da Música"
                />
              </Separacao>
              <BotaoEnviar onClick={saveSong}>Salvar Música</BotaoEnviar>
            </Form>
          </>
        }
      />
    </Tudo>
  );
}
