import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))

// import routes
import userRouter from "../backend/src/routes/user.routes.js"


app.use("/api/users",userRouter);

export { app }