import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({ path: "../.env" });

connectDB()
  .then(() => {
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173", "https://turbotweetsf1.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // io.on("connection", (socket) => {
    //   console.log("Socket connected: ", socket.id);
      
    // });

    server.listen(process.env.SOCKET_PORT || 8081, () => {
      console.log("Scoket Server is running on Port: ", process.env.SOCKET_PORT);
    });

    app.listen(process.env.PORT || 8080, () => {
      console.log("App Server is running on Port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Connection Failed!!  ", error);
  });
