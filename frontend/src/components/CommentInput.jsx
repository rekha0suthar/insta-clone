import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import Comment from './Comment';
import { IoSend } from 'react-icons/io5';

const CommentInput = ({ handleCommentSubmit, showComments, feed }) => {
  const { comment, setComment } = useContext(Context);
  return (
    <div className="comment-section">
      <form onSubmit={(e) => handleCommentSubmit(e, feed._id)}>
        <input
          type="text"
          placeholder="Write your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="send-icon" type="submit">
          <IoSend />
        </button>
      </form>
      {showComments[feed._id] && ( // Only show comments if the feed is selected
        <Comment feed={feed} />
      )}
    </div>
  );
};

export default CommentInput;
