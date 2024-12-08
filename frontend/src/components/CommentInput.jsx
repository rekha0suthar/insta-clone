import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import Comment from './Comment';
import { IoSend } from 'react-icons/io5';

const CommentInput = ({ handleCommentSubmit, showComments, feed }) => {
  const { comment, setComment } = useContext(Context);
  return (
    <div className="comment-section">
      <input
        type="text"
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="send-icon" onClick={() => handleCommentSubmit(feed._id)}>
        <IoSend />
      </div>
      {showComments[feed._id] && ( // Only show comments if the feed is selected
        <Comment feed={feed} />
      )}
    </div>
  );
};

export default CommentInput;
