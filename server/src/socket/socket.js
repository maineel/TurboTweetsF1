import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://turbotweetsf1.netlify.app"],
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (recieverId) => {
    return userToSocketMap[recieverId];
}

const userToSocketMap = {}; // {userId, socketId}

io.on("connection", (socket) => {
//   console.log("User connected to socket", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userToSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userToSocketMap)); // Used to send events to all connected clients

  socket.on("disconnect", () => {
    // console.log("User disconnected from socket", socket.id);
    delete userToSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userToSocketMap)); 
  });
});

export { app, io, server };
