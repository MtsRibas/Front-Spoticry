import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import seta from "../img/Seta.svg";
import logo from "../img/SPOT..svg";
import voltar from "../img/voltar.svg";
import { Colors } from "../Colors/Colors";
import { useNavigate } from "react-router-dom";

const Teste = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-right: 160px;
  color: ${Colors.Branco};
`;

const Sl = styled.div`
  margin-right: 90px;
  &:hover {
    cursor: pointer;
  }
`;

const Inputs = styled.input`
  display: flex;
  width: 372px;
  padding: 21.333px 0px 21.33px 32px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  &:hover {
    border: 2px solid ${Colors.Branco};
    cursor: pointer;
  }
`;

const Logo = styled.div`
  padding-top: 30px;
`;

const Botao = styled.button`
  background-color: white;
  padding: 15px 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    cursor: pointer;
    background-color: ${Colors.Laranja};
    color: ${Colors.Preto};
  }
`;

const Tudo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  background-color: black;
  height: 92vh;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
`;

const LoadingText = styled.p`
  color: ${Colors.Laranja};
  font-size: 18px;
  margin-top: 10px;
`;

export function Login({ Logando }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeSenha = (event) => {
    setPassword(event.target.value);
  };

  const logar = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const response = await axios.post(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/user/login",
        { email, password }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authenticacao", token);
        localStorage.setItem("email", email);
        console.log("Token armazenado com sucesso:", token);

        Logando();
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response);
    }
    setCarregando(false);
  };

  return (
    <div>
      <Logo>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </Logo>
      <Tudo>
        <Teste>
          <Sl>
            <a href="/">
              <img src={voltar} alt="Seta voltar" />
            </a>
          </Sl>
          <h2>Entrar</h2>
        </Teste>
        <Formulario onSubmit={logar}>
          <Inputs
            type="text"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
            required
          />
          <Inputs
            type="password"
            value={password}
            onChange={onChangeSenha}
            placeholder="Senha"
            required
          />
          <Botao type="submit" disabled={carregando}>
            {carregando ? "Carregando..." : "Entrar"}
            {!carregando && <img src={seta} alt="setinha" />}
          </Botao>
          {carregando && <LoadingText>Por favor, aguarde...</LoadingText>}
        </Formulario>
      </Tudo>
    </div>
  );
}
