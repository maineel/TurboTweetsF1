import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

dotenv.config({ path: "../.env" });

connectDB()
  .then(() => {
    const server = createServer(app);
    const io = new Server(server);
    // console.log(server,io);
    io.on("connection", (socket) => {
      console.log("Socket Connected: ", socket.id);
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is running on Port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Connection Failed!!  ", error);
  });
