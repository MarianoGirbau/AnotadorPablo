import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';

const GameResults = () => {
  const { getGameResult, resetGame } = useGameStore();
  const navigate = useNavigate();
  
  const result = getGameResult();

  if (!result) return null; // Si no hay resultados, no renderizar nada

  return (
    <Container className="mt-4 text-center">
      <Alert variant="danger">
        <h4>🚨 {result.loser.player} perdió con {result.loser.score} puntos</h4>
      </Alert>
      <Alert variant="success">
        <h4>🏆 {result.winner.player} ganó con {result.winner.score} puntos</h4>
      </Alert>

      <h3>🏅 Tabla de posiciones:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {result.rankings.map((r, i) => (
            <tr key={i} className={i === 0 ? "table-success" : ""}>
              <td>{i + 1}</td>
              <td>{r.player}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button className="me-2" variant="primary" onClick={resetGame}>🔄 Reiniciar partida</Button>
      <Button variant="secondary" onClick={() => navigate('/')}>🏠 Ir al Home</Button>
    </Container>
  );
};

export default GameResults;
