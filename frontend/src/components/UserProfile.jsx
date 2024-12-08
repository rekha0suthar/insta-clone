import React, { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
import { FiLogOut } from 'react-icons/fi';
import { IoMdHome } from 'react-icons/io';
import logo from '../assets/logo.png';

const UserProfile = () => {
  const { user, getUser, logout, totalUserPosts, getUserFeeds, userPostCount } =
    useContext(Context);
  useEffect(() => {
    getUser();
    userPostCount();
  }, []);
  return (
    <div className="user-profile-container">
      <div className="user-title-logo">
        <img src={logo} alt="@" />
        <h2>InstaClone</h2>
      </div>
      <div className="user-info">
        <img
          src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          alt=""
        />
        <h3>{user.name}</h3>
        <p>{user.address}</p>
        <div>
          <p>{totalUserPosts} Post</p> <p>{user.friendList?.length} Friend</p>
        </div>
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
