import React from 'react';
import UserProfile from '../components/UserProfile';
import FeedContainer from '../components/FeedContainer';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserProfile />
      <FeedContainer />
    </div>
  );
};

export default Dashboard;
