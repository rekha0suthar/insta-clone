import React, { useContext } from 'react';
import { Context } from '../Context/Context';

const Comment = () => {
  const { comments } = useContext(Context);
  return (
    <div className="comments">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comm) => (
          <div className="comment-wrapper" key={comm._id}>
            <div className="comment-header">
              <img
                src={
                  comm.userId.avatar ||
                  'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                }
                alt={`${comm.userId.name}'s avatar`}
              />
              <span>
                <h3>{comm.userId.name || 'Anonymous'}</h3>
                <p>{comm.userId.address || 'Address not available'}</p>
              </span>
            </div>
            <p className="comment">{comm.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
