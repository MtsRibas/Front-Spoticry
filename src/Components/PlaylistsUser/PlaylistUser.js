import React, { useState, useEffect } from "react";
import { HeaderLogado } from "../HeaderLogado/HeaderLogado";
import { Modal } from "../PlaylistsUser/Modal";
import axios from "axios";
import { getTokenData } from "../AuthUtils/getTokenData";
import foguinho from "../img/fireIcon.svg";
import styled from "styled-components";
import adicionar from "../img/adicionar.svg";
import { Colors } from "../Colors/Colors";
import detalheModal from "../img/btnIcon.svg";
import { useNavigate } from "react-router-dom";

const Titulo = styled.div`
  display: flex;
  justify-content: space-between;
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

export function PlaylistUser() {
  const [novaPlaylist, setNovaPlaylist] = useState("");
  const [descricaoPlaylist, setDescricaoPlaylist] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const buscarPlaylists = async (userId, token) => {
    try {
      const response = await axios.get(
        `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/user/${userId}/playlists`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPlaylists(response.data.playlists);
    } catch (error) {
      console.error("Erro ao buscar Playlists:", error.response);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authenticacao");
    const userData = getTokenData(token);
    if (userData && userData.id) {
      buscarPlaylists(userData.id, token);
    }
  }, []);

  const CriarPlaylist = async (token) => {
    const userData = getTokenData(token);
    const userId = userData.id;

    if (!userId) {
      console.error("User ID nao encontrado.");
      return;
    }

    const body = {
      userId: userId,
      songs: [],
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
      setNovaPlaylist("");
      setDescricaoPlaylist("");
      setModalOpen(false);
      console.log("API Response:", response.data);

      buscarPlaylists(userId, token);
      navigate("/playlists"); // Redireciona para playlists após a criação
    } catch (error) {
      console.log("Erro ao criar playlist:", error.response);
    }
  };

  const onClickOpenModal = () => {
    setModalOpen(true);
  };

  const onClickCreatePlaylist = () => {
    const token = localStorage.getItem("authenticacao");
    if (token) {
      CriarPlaylist(token);
    }
  };

  return (
    <div>
      <HeaderLogado />
      <Titulo>
        {" "}
        <h1>
          <span>
            <img src={foguinho} alt="icone de fogo" />
          </span>
          Minhas Playlists
        </h1>
        <BotaoAdicionar onClick={onClickOpenModal}>
          <img src={adicionar} alt="botao de adicionar" />
        </BotaoAdicionar>
      </Titulo>

      <Modal
        aberto={ModalOpen}
        fechado={() => setModalOpen(false)}
        conteudoModal={
          <>
            <TituloModal>
              <img src={detalheModal} alt="Icone playlists" />
              <h2>Criar Playlist</h2>
            </TituloModal>

            <Form onSubmit={(e) => e.preventDefault()}>
              <Separacao>
                <label>Qual será o nome da Playlist?</label>
                <Input
                  type="text"
                  value={novaPlaylist}
                  onChange={(e) => setNovaPlaylist(e.target.value)}
                  placeholder="Nome da playlist"
                  aria-label="Nome da playlist"
                />
              </Separacao>

              <label>Qual será a descrição dela?</label>
              <Input
                type="text"
                value={descricaoPlaylist}
                onChange={(e) => setDescricaoPlaylist(e.target.value)}
                placeholder="Descricao Playlist"
                aria-label="Descricao Playlist"
              />
              <BotaoEnviar type="button" onClick={onClickCreatePlaylist}>
                Save Playlist
              </BotaoEnviar>
            </Form>
          </>
        }
      />

      <div>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist._id}>
                <h3>{playlist._name}</h3>
                <p>{playlist._description}</p>
                <p>Songs: {playlist._songs.length}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma Playlist foi criada</p>
        )}
      </div>
    </div>
  );
}
