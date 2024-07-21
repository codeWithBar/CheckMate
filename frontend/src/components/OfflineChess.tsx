import { Chess, ShortMove } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

const OfflineChess = () => {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: string | ShortMove) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  return (
    <div style={boardWrapper}>
      <Chessboard
        position={game.fen()}
        showBoardNotation={true}
        onPieceDrop={onDrop}
      />
    </div>
  );
};

export default OfflineChess;
