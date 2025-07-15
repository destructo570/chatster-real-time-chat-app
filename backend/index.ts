import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002"
  }
});


io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("onSendMessage", (roomId, message) => {
    console.log("onSendMessage", roomId, message);
    socket.emit("onReceiveMessage", {
      id: "232323", 
      username: "Kunal",
      content: "Hello world",
      timestamp: new Date().toISOString(),
      isOwn: false,
    });
  });

});



// io.listen(3001);
httpServer.listen(3000, () => {
  console.log("Server is running on port 3001");
});

setInterval(() => {
  console.log("Clients connected: ", io.engine.clientsCount);
}, 3000);