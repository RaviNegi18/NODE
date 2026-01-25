import express from "express"
import crypto from 'crypto'

import connectDB from "./config/DB.js";

const app=express()
const PORT=5000;
connectDB()

const token=crypto.randomBytes(32).toString("hex")
console.log(token)



app.get("/",(req,res)=>{
    return res.send({
        message:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(   `app is listening on http://localhost:${PORT}`)
})