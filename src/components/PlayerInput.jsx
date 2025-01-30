import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const PlayerInput = () => {
  const [playerNames, setPlayerNames] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [scoreLimit, setScoreLimit] = useState(100);
  const { setPlayers, setScoreLimit: setGameScoreLimit } = useGameStore();
  const navigate = useNavigate();

  const addPlayer = () => {
    if (newPlayer.trim() && !playerNames.includes(newPlayer)) {
      setPlayerNames([...playerNames, newPlayer]);
      setNewPlayer('');
    }
  };

  const removePlayer = (name) => {
    setPlayerNames(playerNames.filter(player => player !== name));
  };

  const startGame = () => {
    if (playerNames.length > 1) {
      setPlayers(playerNames);
      setGameScoreLimit(scoreLimit);
      navigate('/scoreboard');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🃏 Configuración de Juego</h1>

      <Form>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre del jugador"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            />
          </Col>
          <Col md={4}>
            <Button variant="primary" onClick={addPlayer} disabled={!newPlayer.trim()}>
              ➕ Agregar
            </Button>
          </Col>
        </Row>
      </Form>

      <ul className="list-group mb-3">
        {playerNames.map((player, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {player}
            <Button variant="danger" size="sm" onClick={() => removePlayer(player)}>
              ❌
            </Button>
          </li>
        ))}
      </ul>

      <Form.Group controlId="scoreLimit">
        <Form.Label>🏁 Límite de Puntos (quien llegue a este puntaje pierde):</Form.Label>
        <Form.Control
          type="number"
          value={scoreLimit}
          onChange={(e) => setScoreLimit(Number(e.target.value))}
        />
      </Form.Group>

      <Button
        className="mt-3 w-100"
        variant="success"
        onClick={startGame}
        disabled={playerNames.length < 2}
      >
        🎮 Iniciar Partida
      </Button>
    </Container>
  );
};

export default PlayerInput;
