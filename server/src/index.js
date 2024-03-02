import dotenv from "dotenv";
import connectDB from "./db/index.js";
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
