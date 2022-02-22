import express from 'express';
import {
  registerUser,
  loginUser,
  getMe
} from '../controllers/users.controller.js';
import { protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
