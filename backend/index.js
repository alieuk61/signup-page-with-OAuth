// THIS IS THE MAIN JS FILE WHERE EVERYTHING WILL BE IMPORTED
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser'; 
import './utils/passport.js'
import router from './routes/authRoutes.js';

dotenv.config();
const app = express();
const secret = process.env.SECRET;
const db_uri = process.env.CONNECTION_STRING;
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json());

app.use(passport.initialize());

  mongoose.connect(db_uri);
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


app.use('/auth', router);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})