import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const env = 'prod';

const BASE_API_URI =
  env === 'dev'
    ? 'http://localhost:8080/api'
    : 'https://insta-clone-backend-opal.vercel.app/api';

const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [postImage, setPostImage] = useState();
  const [caption, setCaption] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [totalUserPosts, setTotalUserPosts] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const response = await axios.post(`${BASE_API_URI}/user/signup`, {
          name,
          email,
          password,
          address,
          phone,
        });
        console.log(response);
        navigate('/');
      } else {
        console.log('password does not match');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URI}/user/login`, {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async () => {
    try {
      await axios.post(
        `${BASE_API_URI}/feeds/`,
        { userId, imageUrl: postImage, caption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsShow(false);
      setCaption('');
      getFeeds();
    } catch (err) {
      console.log(err);
    }
  };

  const getFeeds = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/feeds/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeeds(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserFeeds = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/feeds/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeeds(response.data);
      setTotalUserPosts(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const userPostCount = async () => {
    try {
      const response = await axios.get(`${BASE_API_URI}/feeds/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUserPosts(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFeed = async (feedId) => {
    try {
      const response = await axios.delete(`${BASE_API_URI}/feeds/${feedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      getFeeds();
    } catch (err) {
      console.log(err);
    }
  };

  const editFeed = async (feedId) => {
    try {
      const response = await axios.put(
        `${BASE_API_URI}/feeds/${feedId}`,
        { userId, imageUrl: postImage, caption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setIsShow(false);
      getFeeds();
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (feedId) => {
    try {
      if (comment !== '') {
        await axios.post(
          `${BASE_API_URI}/feeds/${feedId}/comments`,
          { userId, comment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComment('');
        getComments(feedId);
        getFeeds();
      } else {
        console.log('Add Comment');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async (feedId) => {
    try {
      const response = await axios.get(
        `${BASE_API_URI}/feeds/${feedId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Use functional update to ensure you're working with the latest state
      setComments((prevComments) => [...response.data, ...prevComments]);
    } catch (err) {
      console.log(err);
    }
  };

  const likeOrUnlikeFeed = async (feedId) => {
    try {
      const response = await axios.post(
        `${BASE_API_URI}/feeds/${feedId}/like`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getFeeds();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        address,
        setAddress,
        phone,
        setPhone,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        signup,
        login,
        logout,
        user,
        setUser,
        getUser,
        isShow,
        setIsShow,
        postImage,
        setPostImage,
        caption,
        setCaption,
        createPost,
        feeds,
        setFeeds,
        getFeeds,
        totalUserPosts,
        setTotalUserPosts,
        getUserFeeds,
        deleteFeed,
        editFeed,
        comment,
        setComment,
        addComment,
        comments,
        setComments,
        getComments,
        likeOrUnlikeFeed,
        userPostCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
