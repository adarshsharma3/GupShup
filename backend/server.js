import express from "express";
import dotenv from "dotenv"; 
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectMongo from "./db/connectMongo.js";
import {app,server} from './socket/socket.js'
import cors from 'cors';
// app.use(cors);
// const app=express();
const port=process.env.PORT||5000;
dotenv.config() ;//to access environment  variables;  //vite me jarurat nahi hoti vo khud sambhal leta hai  
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes); //middleware
app.use("/api/messages",messageRoutes);
app.use('/api/users',userRoutes);
// app.use("/api/")
server.listen(port,()=>{
    connectMongo();
    console.log(`Server is listning at port ${port}`);
})

