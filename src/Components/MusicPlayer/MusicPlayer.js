import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Colors } from "../Colors/Colors";

const PlayerContainer = styled.div`
  height: 100vh;
  width: 160px;
  margin-left: 30px;
  background-color: ${Colors.Preto};

  color: white;
  position: fixed;
  top: 0;
  right: 30;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const BotaoControle = styled.button`
  background-color: ${Colors.Branco};
  color: ${Colors.Preto};
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Laranja};
    color: ${Colors.Branco};
  }
`;

const MusicPlayer = ({ url, playing, setPlaying }) => {
  const playerRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const skipForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playedSeconds + 10, "seconds");
    }
  };

  const skipBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.max(playedSeconds - 10, 0), "seconds");
    }
  };

  return (
    <PlayerContainer>
      <h3>Player</h3>
      {url ? (
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          controls={false} // Usamos controles personalizados
          width="100%"
          height="200px"
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
        />
      ) : (
        <p>Selecione uma música para tocar</p>
      )}
      <div>
        Tempo: {Math.floor(playedSeconds / 60)}:
        {Math.floor(playedSeconds % 60)
          .toString()
          .padStart(2, "0")}
      </div>

      <ControleContainer>
        <BotaoControle onClick={skipBackward}>⏪ Voltar 10s</BotaoControle>
        <BotaoControle onClick={() => setPlaying(!playing)}>
          {playing ? "⏸ Pausar" : "▶️ Reproduzir"}
        </BotaoControle>
        <BotaoControle onClick={skipForward}>⏩ Avançar 10s</BotaoControle>
      </ControleContainer>
    </PlayerContainer>
  );
};

export default MusicPlayer;
