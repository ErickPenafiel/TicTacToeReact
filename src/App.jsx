import { useState, useEffect } from "react";
import { Square } from "./components/Square";
import { turns } from './constants.js';
import { WinnerModal } from "./components/WinnerModal";
import { checkWinner, checkEndGame } from "./logic/board";
import confetti from "canvas-confetti";


function App() {
  // Para persistir datos con useState y localStorage para evitar que renderice cada vez que se actualiza el estado
  // Se recupera los estados en el useState con una función que se ejecuta solo la primera vez que se renderiza el componente
  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn');
    return savedTurn ? savedTurn : turns.X
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turns.X === turn ? turns.O : turns.X;
    setTurn(newTurn);

    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  useEffect(() => {
    console.log("Componente renderizado")
  }, [winner])

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Resetear el Juego</button>
      <section className="game">
        {board.map((cell, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard} >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
