// THIS IS THE MAIN JS FILE WHERE EVERYTHING WILL BE IMPORTED
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import session from 'express-session';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.post('/users', async (req, res) => {
    const {email} = req.userLogin.email;
    const {password} = req.userLogin.password;

    try {
      
    } catch (error) {
      console.error(error)
    }
  })

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})