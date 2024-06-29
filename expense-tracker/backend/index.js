import mongoose from "mongoose";
import { app } from "./app.js";
import dbConnect from "./src/db/dbConnect.js";
import {config} from "dotenv";
config();




dbConnect()
.then(() => {
    console.log("Database connected successfully")
})
.catch(() => {
    console.log("Database connection failed!")
})

app.get("/",(req,res) => {

    res.send("Welcome to expense-tracker")
})

app.listen(process.env.PORT,() => {
    console.log(`Server is listening on localhost port ${process.env.PORT}`)
})

process.on("SIGINT",async () => {
    await mongoose.connection.close();
    process.exit(0);
})

