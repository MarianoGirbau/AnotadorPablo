import React, { useState } from 'react';
import ScoreTable from '../components/ScoreTable';
import GameResults from '../components/GameResults'; // Nuevo componente importado
import useGameStore from '../store/useGameStore';
import { Container, Button } from 'react-bootstrap';

const Scoreboard = () => {
  const { players, rounds, addRound, getGameResult, endGameManually } = useGameStore();
  const [newScores, setNewScores] = useState({});

  const result = getGameResult();

  const handlePuntajeChange = (player, score) => {
    setNewScores({ ...newScores, [player]: score });
  };

  const submitRound = () => {
    if (result) return;
    const scoresArray = players.map(player => Number(newScores[player]) || 0);
    addRound(scoresArray);
    setNewScores({});
  };

  return (
    <Container className="mt-4 text-center">
      <h1 className="mb-4">📊 Marcador</h1>

      {result ? (
        <GameResults /> // Renderizar el componente GameResults si hay un resultado
      ) : (
        <>
          <ScoreTable
            players={players}
            rounds={rounds}
            newScores={newScores}
            handlePuntajeChange={handlePuntajeChange}
          />
          <Button className="mt-3 me-2" variant="success" onClick={submitRound}>➕ Agregar ronda</Button>
          <Button className="mt-3" variant="danger" onClick={endGameManually}>🏁 Finalizar partida</Button>
        </>
      )}
    </Container>
  );
};

export default Scoreboard;
