import { app } from "./app.js";

app.get("/",(req,res) => {

    res.send("Welcome to expense-tracker")
})

app.listen(process.env.PORT,() => {
    console.log(`Server is listening on localhost port ${process.env.PORT}`)
})