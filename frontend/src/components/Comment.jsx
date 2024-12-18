import React, { useContext } from 'react';
import { Context } from '../Context/Context';

const Comment = ({ feed }) => {
  const { comments, loading } = useContext(Context);
  return (
    <div className="comments">
      {!loading && comments.length === 0 ? (
        <p className="comment-dummy">No comments yet.</p>
      ) : (
        comments
          .filter((com) => com.feedId === feed._id)
          .map((comm) => (
            <div className="comment-wrapper" key={comm._id}>
              <div className="comment-header">
                <img
                  src={
                    comm.userId?.avatar ||
                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                  }
                  alt={`${comm.userId?.name}'s avatar`}
                />
                <span>
                  <h3>{comm.userId?.name || 'Anonymous'}</h3>
                  <p>{comm.userId?.address || 'Address not available'}</p>
                </span>
              </div>
              <p className="comment">{comm.comment}</p>
            </div>
          ))
      )}
      {loading && <p className="comment-dummy">Loading Comments</p>}
    </div>
  );
};

export default Comment;
