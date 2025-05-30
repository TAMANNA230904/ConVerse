import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js' 
import dotenv from 'dotenv';
dotenv.config()    
import {connectDB} from './lib/db.js';
import {app,server} from './lib/socket.js'
import path from "path"

const __dirname=path.resolve();
app.use(express.json()); //allows to extract json data from req.body
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)



if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

const PORT=process.env.PORT  || 3000;



server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)   
    connectDB();
})

//22ml10ta877
//JaPKzL1VrNWhvoCn