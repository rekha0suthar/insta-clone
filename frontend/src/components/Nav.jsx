import React, { useContext } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoMicOutline } from 'react-icons/io5';
import '../styles/nav.css';
import { Context } from '../Context/Context';
import AddPost from './AddPost';
const Nav = () => {
  const { isShow, setIsShow } = useContext(Context);
  return (
    <>
      <div className="nav-container">
        <div>
          <IoIosSearch className="search-icon" />
          <input type="text" />
          <IoMicOutline className="mic-icon" />
        </div>
        <button onClick={() => setIsShow(true)}>Create new Post</button>
      </div>
      {isShow && <AddPost />}
    </>
  );
};

export default Nav;
