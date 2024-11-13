import React, { useState } from "react";
import Logo from "../img/SPOT..svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToMusics, goToPlaylists } from "../Rotas/Cordinator";
import { Colors } from "../Colors/Colors";

const Nav = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
`;

const Juncao = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BotoesMenu = styled.li`
  background-color: transparent;
  color: ${Colors.Branco};

  &:hover {
    border-bottom: 2px solid ${Colors.Laranja};
    cursor: pointer;
  }
`;

const Filtro = styled.input`
  padding: 16px 48px;
  border-radius: 32px;
  text-align: center;
  width: 300px;
  background-size: 25px;
  position: relative;
`;

const BotaoSair = styled.button`
  background-color: transparent;
  border: 1px solid ${Colors.Laranja};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${Colors.Branco};
  &:hover {
    background-color: ${Colors.Vermelho};
    cursor: pointer;
  }
`;

export function HeaderLogado() {
  const [Buscar, setBuscar] = useState("");
  const navigate = useNavigate();

  const onChangeBuscar = (e) => {
    setBuscar(e.target.value);
  };

  const sair = () => {
    localStorage.removeItem("authenticacao");
    navigate("/login");
  };

  const goHome = () => {
    goToHomePage(navigate);
  };

  const goPlaylists = () => {
    goToPlaylists(navigate);
  };

  const goMusics = () => {
    goToMusics(navigate);
  };

  return (
    <div>
      <Menu>
        <Juncao>
          <img src={Logo} alt="logo" />

          <Nav>
            <li>
              <BotoesMenu onClick={goHome}>Home</BotoesMenu>
            </li>
            <li>
              <BotoesMenu onClick={goPlaylists}>Playlist</BotoesMenu>
            </li>
            <li>
              <BotoesMenu onClick={goMusics}>Minhas Músicas</BotoesMenu>
            </li>
          </Nav>
        </Juncao>
        <Filtro
          type="text"
          value={Buscar}
          onChange={onChangeBuscar}
          placeholder="  Pesquisar suas músicas"
        />
        <BotaoSair onClick={sair}>Logout</BotaoSair>
      </Menu>
    </div>
  );
}
