import dotenv from "dotenv";
import connectDB from "./db/index.js";
<<<<<<< HEAD
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
=======
import app from "./app.js";

dotenv.config({path: "../.env"}); // configuring .env

const port = process.env.PORT || 8000;
// console.log(process.env.MONGODB_URI, process.env.DB_NAME);
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.log("Mongo DB connection failed at server/src/index.js ", err);
});
>>>>>>> ea5286eff9c104a0b05ae90afde64a3ffd26068d
