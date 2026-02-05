import express from "express"
// import userRoutes from "./routes/authRoutes.js"
import connectDB from "./config/DB.js";
import cors from 'cors'
import { configDotenv } from "dotenv";
import crypto from "crypto"
configDotenv()
const app=express()
const PORT=5000;
connectDB()

app.use(express.json())



app.use(cors())

// app.use("/api", userRoutes)

app.listen(PORT,()=>{
    console.log(   `app is listening on http://localhost:${PORT}`)
})