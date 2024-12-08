import React from 'react';
import Nav from './Nav';
import Feeds from './Feeds';

const FeedContainer = () => {
  return (
    <div className="feed-container">
      <Nav />
      <Feeds />
    </div>
  );
};

export default FeedContainer;
