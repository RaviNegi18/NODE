import express from "express"


const app=express()


const PORT=5000;





app.get("/",(req,res)=>{
    return res.send({
        message:"hello"
    })
})

app.listen(PORT,()=>{
    console.log(   `app is listening on http://localhost:${PORT}`)
})