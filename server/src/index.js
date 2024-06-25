import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { server } from "./socket/socket.js";

dotenv.config({ path: "../.env" });

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8080, () => {
      console.log("App Server is running on Port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Connection Failed!!  ", error);
  });
