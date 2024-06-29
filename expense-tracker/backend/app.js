import express, { Router } from "express"

const app = express()
const router = Router()


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))




export { app }