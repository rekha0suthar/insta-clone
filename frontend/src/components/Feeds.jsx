import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import '../styles/post.css';
import FeedHeader from './FeedHeader';
import CommentInput from './CommentInput';
import LikeComment from './LikeComment';

const userId = localStorage.getItem('userId');

const Feeds = () => {
  const [showComments, setShowComments] = useState({}); // Track which feed's comments are shown
  const { feeds, getFeeds, comment, setComment, addComment, getComments } =
    useContext(Context);

  const showCommentHandler = (feedId) => {
    setShowComments((prev) => ({ ...prev, [feedId]: !prev[feedId] })); // Toggle comment visibility
    if (!showComments[feedId]) {
      getComments(feedId); // Fetch comments only if they are being shown
    }
  };

  const handleCommentSubmit = (e, feedId) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(feedId); // Pass the comment to addComment
      setComment(''); // Clear the input field
      showCommentHandler(feedId);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div className="feed-wrapper">
      <h2>Feeds</h2>
      {feeds.length > 0 &&
        feeds.map((feed) => {
          const isLiked = feed.likes.includes(userId);
          return (
            <div className="feed" key={feed._id}>
              <FeedHeader feed={feed} />
              <p className="caption">{feed.caption}</p>
              <img src={feed.imageUrl} alt="" />
              <LikeComment
                isLiked={isLiked}
                feed={feed}
                showCommentHandler={showCommentHandler}
              />

              <CommentInput
                handleCommentSubmit={handleCommentSubmit}
                showComments={showComments}
                feed={feed}
              />
            </div>
          );
        })}
      {feeds.length === 0 && (
        <div style={{ textAlign: 'center' }}>No Feeds</div>
      )}
    </div>
  );
};

export default Feeds;
