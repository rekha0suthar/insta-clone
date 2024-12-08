import React, { useContext, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Context } from '../Context/Context';
import AddPost from './AddPost';

const userId = localStorage.getItem('userId');
let id;

const FeedHeader = ({ feed }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isShow, setIsShow, deleteFeed } = useContext(Context);

  const editHandler = (feedId) => {
    setIsShow(true);
    id = feedId;
  };

  return (
    <>
      <div className="user-header">
        <img
          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          alt=""
        />
        <span>
          <h2>{feed.userId.name}</h2>
          <p>{feed.userId.address}</p>
        </span>
        {feed.userId._id === userId && (
          <div className="feed-menu" onClick={() => setShowMenu(!showMenu)}>
            <BsThreeDots />
          </div>
        )}
        {showMenu && (
          <div className="options">
            <p onClick={() => editHandler(feed._id)}>Edit</p>
            <p onClick={() => deleteFeed(feed._id)}>Delete</p>
          </div>
        )}
      </div>
      {isShow && <AddPost feedId={id} />}
    </>
  );
};

export default FeedHeader;
