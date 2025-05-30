import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main container for TicTacToe Classic - two player, 3x3 board, status & restart, modern UI.
 */
function TicTacToeClassic() {
  // State: 0=X, 1=O
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState(null);

  // Check for wins or draw
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);
  const isBoardFull = board.every((sq) => sq);

  // Derive game status string
  let statusText = "";
  if (winner) {
    statusText = `Winner: ${winner === "X" ? "Player 1 (X)" : "Player 2 (O)"}`;
  } else if (isBoardFull) {
    statusText = "It's a draw!";
  } else {
    statusText = `Turn: ${isXNext ? "Player 1 (X)" : "Player 2 (O)"}`;
  }

  // Handle square click
  function handleClick(idx) {
    if (board[idx] || winner) return; // No changes if filled or over
    const newBoard = board.slice();
    newBoard[idx] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    // Don't setStatus here; it's always derived.
  }

  // Restart game
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus(null);
  }

  // Render a square cell
  function Square({ value, onClick }) {
    return (
      <button
        className="ttt-square"
        onClick={onClick}
        disabled={!!value || winner}
        aria-label={value ? `Occupied by ${value}` : "Place mark"}
      >
        {value}
      </button>
    );
  }

  // Map for mobile response (wrap board)
  return (
    <div className="ttt-outer-container">
      <div className="ttt-title">TicTacToe Classic</div>
      <div className="ttt-status">{statusText}</div>

      {/* Game Board */}
      <div className="ttt-board">
        {board.map((val, idx) => (
          <Square
            key={idx}
            value={val}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
      {/* Status and button */}
      <div className="ttt-panel">
        {(winner || isBoardFull) && (
          <div className="ttt-result">{statusText}</div>
        )}
        <button className="btn btn-large ttt-restart-btn" onClick={handleRestart}>
          Restart
        </button>
      </div>
      <div className="ttt-info">
        <span
          style={{
            fontSize: "1rem",
            opacity: 0.65,
            color: "var(--text-secondary)",
            marginTop: 12,
            display: "block",
          }}
        >
          Click a cell to play. Two players take turns on the same device.
        </span>
      </div>
    </div>
  );
}

export default TicTacToeClassic;

/*
  --------- Styling guidance ---------------
  All core visual adjustments are handled via a custom CSS block that you should add to App.css.
  Classnames used in this component: .ttt-outer-container, .ttt-title, .ttt-status, .ttt-board, .ttt-square, .ttt-panel, .ttt-result, .ttt-restart-btn, .ttt-info
*/
