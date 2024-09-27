import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.route.js"
import cors from "cors"

const app=express()
dotenv.config()


const dbconnect=mongoose.connect(process.env.MONGO_RUL).then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err)
})

// ================================= cors setting
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true
// }))

// ================================= repress json and cookie parser
app.use(express.json())



// ================================= Routes
app.use("/api/v1/auth",authRouter)



app.listen(9090,()=>{
    console.log("server is runing on port 9090")
})


app.use((err,req,res,next)=>{
    if(err.code===11000){
        err.message="اطلاعات وارید شده غیر معتبر می باشد"
    }
    const statusCode=err.statusCode || 500
    const message=err.message || "خطای سرور"
    res.status(statusCode).json({
        success:false,
        message,
        stack:err.stack
    })
})