import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3002", "http://localhost:3001"]
  }
});


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log("message: ", message);
    socket.to(message.roomId).emit("message", {
      ...message,
      isOwn: false // Mark as not own for recipients
    });
  });

  socket.on("joinRoom", (roomId) => {
    console.log("joinRoom", roomId);
    socket.join(roomId);
  });

});



// io.listen(3001);
httpServer.listen(3000, () => {
  console.log("Server is running on port 3001");
});

setInterval(() => {
  console.log("Clients connected: ", io.engine.clientsCount);
}, 3000);