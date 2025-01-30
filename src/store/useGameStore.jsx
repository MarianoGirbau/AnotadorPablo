import { create } from 'zustand';

const useGameStore = create((set, get) => ({
  players: [],
  scoreLimit: 100,
  rounds: [],
  gameEnded: false, // Nuevo estado para saber si la partida se terminó manualmente
  manualResult: null, // Resultado cuando se finaliza manualmente

  setPlayers: (players) => set({ players }),
  setScoreLimit: (limit) => set({ scoreLimit: limit }),

  addRound: (roundScores) => set((state) => {
    if (state.gameEnded) return {}; // No agregar más rondas si la partida ya terminó
    return { rounds: [...state.rounds, roundScores] };
  }),

  resetGame: () => set({ rounds: [], gameEnded: false, manualResult: null }),

  // Función para verificar si alguien perdió automáticamente
  getGameResult: () => {
    const { players, rounds, scoreLimit, gameEnded, manualResult } = get();
    
    // Si la partida se terminó manualmente, devolver ese resultado
    if (gameEnded) return manualResult;

    // Calcular puntajes totales
    const scores = players.map((_, i) =>
      rounds.reduce((sum, round) => sum + round[i], 0)
    );

    // Verificar si alguien perdió automáticamente
    const loserIndex = scores.findIndex((score) => score >= scoreLimit);
    if (loserIndex !== -1) {
      const winnerIndex = scores.indexOf(Math.min(...scores));
      return {
        loser: { player: players[loserIndex], score: scores[loserIndex] },
        winner: { player: players[winnerIndex], score: scores[winnerIndex] },
        rankings: players.map((player, i) => ({ player, score: scores[i] }))
          .sort((a, b) => a.score - b.score),
      };
    }

    return null;
  },

  // Nueva función para finalizar la partida manualmente
  endGameManually: () => {
    const { players, rounds } = get();

    // Calcular puntajes finales
    const scores = players.map((_, i) =>
      rounds.reduce((sum, round) => sum + round[i], 0)
    );

    // Ordenar jugadores por puntaje
    const rankings = players.map((player, i) => ({ player, score: scores[i] }))
      .sort((a, b) => a.score - b.score);

    // Guardar resultado manual y marcar la partida como finalizada
    set({
      gameEnded: true,
      manualResult: {
        winner: rankings[0], // Jugador con menor puntaje
        loser: rankings[rankings.length - 1], // Jugador con mayor puntaje
        rankings,
      },
    });
  }
}));

export default useGameStore;
