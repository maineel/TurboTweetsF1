import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({path: './.env'}); // configuring .env

connectDB()
.then(() => {   // if successful connection established then start the PORT
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on Port: ", process.env.PORT);
    });
})
.catch((error) => { // Error
    console.log("Connection Failed!!  ", error);
});