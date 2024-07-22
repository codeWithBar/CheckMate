import { Chess, Square } from "chess.js";
import { useMemo, useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Piece } from "react-chessboard/dist/chessboard/types";
import io from "socket.io-client";

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

const buttonStyle = {
  cursor: "pointer",
  padding: "10px 20px",
  margin: "10px 10px 0px 0px",
  borderRadius: "6px",
  backgroundColor: "#f0d9b5",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const socket = io("http://localhost:5001");

const OnlineChess = () => {
  const game = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with id: ${socket.id}`);
    });

    socket.on("move", (move) => {
      game.move(move);
      setGamePosition(game.fen());
      console.log(`Move received: ${JSON.stringify(move)}`);
    });

    return () => {
      socket.off("connect");
      socket.off("move");
    };
  }, [game]);

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    setGamePosition(game.fen());

    socket.emit("move", move);
    console.log(`Move sent: ${JSON.stringify(move)}`);

    // exit if the game is over
    if (game.isGameOver() || game.isDraw()) return false;

    return true;
  };

  return (
    <div style={boardWrapper}>
      <Chessboard position={gamePosition} onPieceDrop={onDrop} />
      <button
        style={buttonStyle}
        onClick={() => {
          game.reset();
          setGamePosition(game.fen());
        }}
      >
        New game
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          game.undo();
          setGamePosition(game.fen());
        }}
      >
        Undo
      </button>
    </div>
  );
};

export default OnlineChess;
