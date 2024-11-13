import React from "react";
import styled from "styled-components";
import logo from "../img/SPOT..svg";
import fotoBanner from "../img/banner.png";
import foto1 from "../img/Foto112.png";
import foto2 from "../img/Foto2.png";
import foto3 from "../img/Foto3.png";
import { Colors } from "../Colors/Colors";
import icon1 from "../img/Music.svg";
import icon2 from "../img/play.svg";
import icon3 from "../img/world.svg";
import icon4 from "../img/disco.svg";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../Rotas/Cordinator";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  text-decoration: none;
  color: ${Colors.Branco};
`;
const BotaoLogin = styled.button`
  background-color: transparent;
  border: none;
  color: ${Colors.Branco};
  &:hover {
    border-bottom: 2px solid ${Colors.Laranja};
    color: ${Colors.Branco};
    cursor: pointer;
  }
`;
const Banner = styled.div`
  background-image: url(${fotoBanner});
  background-size: cover;
  background-position: center;

  height: 500px;
`;
const GeneroBanner = styled.div`
  align-items: center;
  justify-content: center;

  text-align: center;
  margin-top: 60px;
`;

const Lista = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: ${Colors.Branco};
`;
const ListItem = styled.li`
  padding: 5px 48px;
  border-radius: 32px;
  color: ${Colors.Branco};
  background-color: ${Colors.Cinza};
  &:hover {
    background-color: ${Colors.Laranja};
    color: ${Colors.Preto};
  }
`;
const TituloGender = styled.p`
  font-size: 20px;
  color: ${Colors.Branco};
`;
const TextoDetalhe = styled.p`
  color: gray;
`;
const Specify = styled.div`
  text-align: center;
  margin-top: 110px;
  color: ${Colors.Branco};
`;
const DivFotos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  color: ${Colors.Branco};
`;
const DivEspecificacoes = styled.div`
  border: 3px solid ${Colors.Branco};
  border-radius: 16px;
  padding: 16px 16px 0px 16px;
  color: ${Colors.Branco};
  &:hover {
    border: 3px solid ${Colors.Laranja};
  }
`;

const Detalhes = styled.div`
  text-align: center;
  margin-top: 110px;
  color: ${Colors.Branco};
`;
const DetalhesInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 20px;
`;
const DivInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: ${Colors.Cinza};
  border-radius: 53px;
  padding: 5px 80px;
  gap: 5px;
  align-items: center;
  text-align: start;
  font-size: 20px;
  font-weight: bold;
`;

const SessionStart = styled.div`
  text-align: center;
  margin-top: 80px;
  color: ${Colors.Branco};
`;
const Botao = styled.button`
  background-color: ${Colors.Cinza};
  color: ${Colors.Branco};
  border: none;
  padding: 35px 130px;
  border-radius: 96px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Laranja};
    color: ${Colors.Preto};
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 150px;
  padding-bottom: 30px;
  color: ${Colors.Branco};
`;
const Detail = styled.span`
  margin-top: 25px;
  padding: 0px 400px;
  max-width: 100%;
  border-radius: 10px;
  background-color: ${Colors.Laranja};
  height: 5px;
  align-items: center;
`;

const Desenvolvido = styled.p`
  color: ${Colors.Branco};
`;
export function LandingPage() {
  const navigate = useNavigate();
  const goLogin = () => {
    goToLoginPage(navigate);
  };
  return (
    <div>
      <Banner>
        <Header>
          <img src={logo} alt="logo" />
          <BotaoLogin onClick={goLogin}>Entrar na conta</BotaoLogin>
        </Header>
      </Banner>
      <GeneroBanner>
        <TituloGender>Todos os melhores genêros</TituloGender>

        <Lista>
          <ListItem>
            <p>ROCK</p>
          </ListItem>
          <ListItem>
            <p>FORRÓ</p>
          </ListItem>
          <ListItem>
            <p>POP</p>
          </ListItem>
          <ListItem>
            <p>FUNK</p>
          </ListItem>
        </Lista>

        <TextoDetalhe>e muito mais</TextoDetalhe>
      </GeneroBanner>
      <Specify>
        <h3>Disponibilize sua música para todos</h3>
        <DivFotos>
          <DivEspecificacoes>
            <img src={foto1} alt="foto1"></img>
            <p>Todos os nichos na sua mão</p>
          </DivEspecificacoes>
          <DivEspecificacoes>
            <img src={foto2} alt="foto2"></img>
            <p>Suporte 100% para artistas</p>
          </DivEspecificacoes>
          <DivEspecificacoes>
            <img src={foto3} alt="foto3"></img>
            <p>Maior visibilidade nacional</p>
          </DivEspecificacoes>
        </DivFotos>
      </Specify>
      <Detalhes>
        <h2>Com as melhores vantagens</h2>
        <DetalhesInfo>
          <DivInfo>
            <img src={icon1} alt="icon music" />

            <p>+ 500 músicas</p>
          </DivInfo>
          <DivInfo>
            <img src={icon2} alt="icon play" />
            <p>
              Envie sua música <br />
              com um toque
            </p>
          </DivInfo>

          <DivInfo>
            <img src={icon3} alt="icon world" />
            <p>
              Poder de escutar
              <br /> offline
            </p>
          </DivInfo>
          <DivInfo>
            <img src={icon4} alt="icon disco" />
            <p>Qualidade superior</p>
          </DivInfo>
        </DetalhesInfo>
      </Detalhes>
      <SessionStart>
        <p>Inicie sua sessão e faça parte</p>

        <Botao onClick={goLogin}>COMECE A ESCUTAR</Botao>
      </SessionStart>
      <Footer>
        <img src={logo} alt="logo" />
        <Detail></Detail>
        <Desenvolvido>Desenvolvido por Crias</Desenvolvido>
      </Footer>
    </div>
  );
}
