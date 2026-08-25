import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';


const PORT= 4000;
const app= express();


//Middlewares
app.use(cors());
app.use(express.json({limit:"1mb"}));


//DB
connectDB();

//Routes
app.get('/', (req,res)=>{
    res.send("API WORKING");
})

app.listen(PORT, ()=>{
    console.log(`Server Started on http://localhost:${PORT}`);
})