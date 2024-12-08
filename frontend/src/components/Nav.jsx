import React, { useContext } from 'react';
import '../styles/nav.css';
import { Context } from '../Context/Context';
import logo from '../assets/logo.png';
import AddPost from './AddPost';

const Nav = () => {
  const { isShow, setIsShow } = useContext(Context);
  return (
    <>
      <div className="nav-container">
        <img src={logo} alt="@" />
        <button onClick={() => setIsShow(true)}>Create new Post</button>
      </div>
      {isShow && <AddPost />}
    </>
  );
};

export default Nav;
