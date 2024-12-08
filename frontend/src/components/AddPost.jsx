import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import '../styles/post.css';

const AddPost = ({ feedId }) => {
  const { setIsShow, setPostImage, caption, setCaption, createPost, editFeed } =
    useContext(Context);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPostImage(base64String); // Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const onClickHandler = () => {
    if (feedId) {
      editFeed(feedId);
    } else {
      createPost();
    }
  };
  return (
    <div className="overlay" onClick={() => setIsShow(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={() => setIsShow(false)}>
          &times;
        </span>
        <h2>{feedId ? 'Edit Post' : 'Add New Post'}</h2>
        <input type="file" onChange={handleFileChange} required />
        <input
          type="text"
          name="caption"
          id="caption"
          placeholder="Add caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={onClickHandler}>Save Post</button>
      </div>
    </div>
  );
};

export default AddPost;
