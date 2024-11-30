import { Router } from 'express';
import {
  getUser,
  login,
  signup,
  updateUserProfile,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUserProfile);

export default router;
