import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  createFeed,
  deleteFeed,
  getFeeds,
  getUserFeed,
  likeOrUnlikeFeed,
  updateFeed,
} from '../controllers/feeds.js';

const router = Router();

router.post('/', verifyToken, createFeed);
router.get('/', verifyToken, getFeeds);
router.get('/:id', verifyToken, getUserFeed);
router.put('/:id', verifyToken, updateFeed);
router.delete('/:id', verifyToken, deleteFeed);
router.post('/like/:id', verifyToken, likeOrUnlikeFeed);

export default router;
