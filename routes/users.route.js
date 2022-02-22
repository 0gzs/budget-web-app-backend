import express from 'express';
import {
  registerUser,
  loginUser,
  getMe
} from '../controllers/users.controller';
import { protect } from '../middleware/authMiddleWare';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
