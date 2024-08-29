import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

// google auth
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // google client id
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback", 
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
     
        try {
            // Check if the user already exists
            let user = await User.findOne({ email: profile.emails[0].value });
      
            if (user) {
              
              return done(null, user);
            } else {
              user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
              });
              await user.save();
              return done(null, user);
            }
          } catch (err) {
            return done(err, null);
          }
           }
         )
       );