import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const auth = async (req, res, next) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', ''); //here we are removing the Bearer text in the req.header

   if (!token) {
     throw new Error(); 
   }

   const decoded = jwt.verify(token, SECRET);
   req.token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};

export const googleAuthCallback = (req, res) => {
  // Generate a JWT and send it to the client
  if(req.user){
  const user = req.user;
  const token = jwt.sign({ id: req.user._id }, process.env.SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    } 
};
