import { Server } from "socket.io";

interface Rooms {
  [key: string]: string[];
}

const socketManager = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Event listener for handling moves
    socket.on("move", (move) => {
      console.log("Move received:", move);
      socket.broadcast.emit("move", move);
    });

    // Event listener for handling disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketManager;
