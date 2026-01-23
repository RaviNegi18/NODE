import express from "express"

import connectDB from "./config/DB";
import { connect } from "mongoose";
const app=express()
const PORT=5000;
connectDB()




app.get("/",(req,res)=>{
    return res.send({
        message:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(   `app is listening on http://localhost:${PORT}`)
})