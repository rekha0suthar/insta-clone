import React, { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
import { FiLogOut } from 'react-icons/fi';
import { IoMdHome } from 'react-icons/io';

const UserProfile = () => {
  const { user, getUser, logout, totalUserPosts, getUserFeeds, userPostCount } =
    useContext(Context);
  useEffect(() => {
    getUser();
    userPostCount();
  }, []);
  return (
    <div className="user-profile-container">
      <h2>@InstaClone</h2>
      <div className="user-info">
        <img
          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          alt=""
        />
        <h3>{user.name}</h3>
        <p>{user.address}</p>
        <div>{totalUserPosts} Post</div>
      </div>
      <div className="option-menu">
        <div onClick={() => getUserFeeds()}>
          <IoMdHome /> My Feeds
        </div>
        <div onClick={logout}>
          <FiLogOut /> Log out
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
