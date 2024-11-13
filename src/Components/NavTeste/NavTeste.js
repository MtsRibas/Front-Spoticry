import React from "react";
import styled from "styled-components";
import { Colors } from "../Colors/Colors";
import fotoUsuario from "../img/perfil.jpg";
import casa from "../img/casa.svg";
import musica from "../img/musica2.svg";
import { useNavigate } from "react-router-dom";
import { goToMusics } from "../Rotas/Cordinator";

const BarraLateral = styled.div`
  height: 100vh;
  width: 160px;
  margin-left: 30px;

  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
`;

const MenuItem = styled.button`
  width: 100%;
  border: none;
  color: white;
  padding: 10px 0;
  background-color: transparent;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
`;
const Usuario = styled.p`
  font-size: 11px;
`;
const FotoUser = styled.img`
  width: 70px;
`;
const Detail = styled.span`
  padding: 0px 80px;
  max-width: 100%;
  border-radius: 10px;
  background-color: ${Colors.Laranja};
  height: 1px;
  align-items: center;
`;
const Teste = styled.div`
  display: flex;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: ${Colors.Cinza};
    border-right: 3px solid ${Colors.Laranja};
  }
`;
export function NavTeste() {
  const user = localStorage.getItem("email");
  const navigate = useNavigate();
  const goMusics = () => {
    goToMusics(navigate);
  };

  return (
    <BarraLateral>
      <UserInfo>
        <FotoUser src={fotoUsuario} alt="Foto perfil" />
        <Usuario>{user}</Usuario>
        <Detail></Detail>
      </UserInfo>
      <Teste>
        <img src={casa} alt="Icone casa" />
        <MenuItem onClick={""}>Home</MenuItem>
      </Teste>
      <Teste>
        <img src={musica} alt="Icone musica" />
        <MenuItem onClick={goMusics}>Minhas Músicas</MenuItem>
      </Teste>
    </BarraLateral>
  );
}
