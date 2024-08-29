import {Router} from 'express';
import passport from 'passport';
import { login, register } from '../controllers/authController.js';
import { googleAuthCallback } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
// Route to start the Google OAuth process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { session: false }), // This middleware handles authentication
    googleAuthCallback // This is the function that generates the JWT
);

export default router;