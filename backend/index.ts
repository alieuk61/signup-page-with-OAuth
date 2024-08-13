// THIS IS THE MAIN JS FILE WHERE EVERYTHING WILL BE IMPORTED
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/authRoutes';
import {SECRET, CONNECTION_STRING, PORT} from './config/config'
import { z } from 'zod';

dotenv.config();
const app = express();

app.use(cors({
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json());

  mongoose.connect(CONNECTION_STRING);
  const db = mongoose.connection

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})