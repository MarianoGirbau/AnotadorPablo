import React from 'react';
import { Table, Form } from 'react-bootstrap';

const ScoreTable = ({ players, rounds, newScores, handlePuntajeChange }) => {
  return (
    <div>
      <h2 className="mb-3">📝 Ingresar puntajes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ronda</th>
            {players.map((player, i) => (
              <th key={i}><strong>{player}</strong></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, i) => (
            <tr key={i}>
              <td><strong>Ronda {i + 1}</strong></td>
              {round.map((score, j) => (
                <td key={j}>{score}</td>
              ))}
            </tr>
          ))}
          {/* Fila para ingresar la nueva ronda */}
          <tr>
            <td><strong>Nueva Ronda</strong></td>
            {players.map((player, i) => (
              <td key={i}>
                <Form.Control
                  type="number"
                  value={newScores[player] || ""}
                  onChange={(e) => handlePuntajeChange(player, e.target.value)}
                />
              </td>
            ))}
          </tr>
          {/* Fila de totales */}
          <tr>
            <td><strong>Total</strong></td>
            {players.map((_, i) => (
              <td key={i}>
                <strong>{rounds.reduce((sum, round) => sum + round[i], 0)}</strong>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ScoreTable;
