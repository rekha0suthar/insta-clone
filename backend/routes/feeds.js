import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  createFeed,
  deleteFeed,
  getFeeds,
  getUserFeeds,
  likeOrUnlikeFeed,
  updateFeed,
} from '../controllers/feeds.js';
import { addComment, getComments } from '../controllers/comments.js';

const router = Router();

router.post('/', verifyToken, createFeed);
router.get('/', verifyToken, getFeeds);
router.get('/:userId', verifyToken, getUserFeeds);
router.put('/:id', verifyToken, updateFeed);
router.delete('/:id', verifyToken, deleteFeed);
router.post('/:id/like', verifyToken, likeOrUnlikeFeed);
router.post('/:id/comments', verifyToken, addComment);
router.get('/:id/comments', verifyToken, getComments);

export default router;
