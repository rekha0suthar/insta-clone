import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  createFeed,
  deleteFeed,
  getFeeds,
  getUserFeed,
  updateFeed,
} from '../controllers/feeds.js';

const router = Router();

router.post('/', verifyToken, createFeed);
router.get('/', verifyToken, getFeeds);
router.get('/:id', verifyToken, getUserFeed);
router.put('/:id', verifyToken, updateFeed);
router.delete('/:id', verifyToken, deleteFeed);

export default router;
