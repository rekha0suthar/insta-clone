import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeComment = ({ isLiked, feed, showCommentHandler }) => {
  const { likeOrUnlikeFeed } = useContext(Context);
  return (
    <div className="feed-footer">
      <span onClick={() => likeOrUnlikeFeed(feed._id)}>
        {!isLiked ? <FaRegHeart /> : <FaHeart />} {feed.likes.length} Likes
      </span>
      <span
        className="highlight-comment"
        onClick={() => showCommentHandler(feed._id)}
      >
        {feed.comments.length} Comments
      </span>
    </div>
  );
};

export default LikeComment;
