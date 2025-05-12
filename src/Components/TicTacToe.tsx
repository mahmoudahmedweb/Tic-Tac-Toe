import { useState } from "react";
import "./TicTacToe.scss";

type Player = "X" | "O";
type BoardState = (Player | null)[];

interface Winner {
  player: Player | "Draw";
  combination: [number, number, number] | [];
}

const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Winner | null>(null);

  const checkWinner = (updatedBoard: BoardState): Winner | null => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return {
          player: updatedBoard[a] as Player,
          combination,
        };
      }
    }

    return updatedBoard.every((cell) => cell)
      ? { player: "Draw", combination: [] }
      : null;
  };

  const handleClick = (index: number) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "X" : "O";

    const gameResult = checkWinner(updatedBoard);
    setBoard(updatedBoard);
    setIsXNext(!isXNext);

    if (gameResult) {
      setWinner(gameResult);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tictactoe-container">
      <h1>Tic Tac Toe</h1>

      {winner ? (
        <p className="result">
          {winner.player === "Draw"
            ? "Game ended in a draw!"
            : `Player ${winner.player} wins!`}
        </p>
      ) : (
        <p className="result">Current player: {isXNext ? "X" : "O"}</p>
      )}

      <div className="board" role="grid">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${
              winner?.combination.includes(index) ? "winner" : ""
            }`}
            onClick={() => handleClick(index)}
            disabled={!!winner || !!cell}
            aria-label={`Cell ${index + 1}. ${
              cell ? `Occupied by ${cell}` : "Empty"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
