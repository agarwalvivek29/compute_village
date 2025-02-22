import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app=express();
import cors from 'cors'
import {connectDB} from './config/index';
import collectionROute from './routes/index'
const PORT=process.env.PORT||8000;
app.use(express.json());
app.use(cors())
app.get('/',()=>{
    console.log("hello");
})

connectDB();

app.use('/',collectionROute);
app.listen(PORT,()=>{
    console.log("Server is running on PORT",PORT);
})