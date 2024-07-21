import { Server } from "socket.io";

interface Rooms {
  [key: string]: string[];
}

const socketManager = (io: Server) => {
  let rooms: Rooms = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (room: string) => {
      if (rooms[room]) {
        if (rooms[room].length === 1) {
          rooms[room].push(socket.id);
          socket.join(room);
          io.to(room).emit("startGame", room);
        } else {
          socket.emit("roomFull", room);
        }
      } else {
        rooms[room] = [socket.id];
        socket.join(room);
      }
    });

    socket.on("move", (data: { room: string; move: any }) => {
      io.to(data.room).emit("move", data);
    });

    socket.on("disconnect", () => {
      for (let room in rooms) {
        rooms[room] = rooms[room].filter((id) => id !== socket.id);
        if (rooms[room].length === 0) {
          delete rooms[room];
        }
      }
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default socketManager;
