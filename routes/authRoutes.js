import express from 'express';
import { signup, login, deleteAccount } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.delete('/delete-account', protect, deleteAccount);

export default router;