import { Server } from "socket.io";

interface Rooms {
  [key: string]: string[];
}

const socketManager = (io: Server) => {
  let rooms: Rooms = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Event listener for joining a room
    socket.on("joinRoom", (room: string) => {
      // Check if the room exists
      if (rooms[room]) {
        // If the room has one player, add the second player
        if (rooms[room].length === 1) {
          rooms[room].push(socket.id);
          socket.join(room); // Join the room
          io.to(room).emit("startGame", room); // Notify both players to start the game
        } else {
          socket.emit("roomFull", room); // Notify the player that the room is full
        }
      } else {
        rooms[room] = [socket.id]; // Create a new room and add the player
        socket.join(room); // Join the room
      }
    });

    // Event listener for handling moves
    socket.on("move", (data: { room: string; move: any }) => {
      // Broadcast the move to the other player in the room
      io.to(data.room).emit("move", data);
    });

    // Event listener for handling disconnection
    socket.on("disconnect", () => {
      // Remove the player from any rooms they are in
      for (let room in rooms) {
        rooms[room] = rooms[room].filter((id) => id !== socket.id);
        // If the room is empty, delete it
        if (rooms[room].length === 0) {
          delete rooms[room];
        }
      }
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketManager;
