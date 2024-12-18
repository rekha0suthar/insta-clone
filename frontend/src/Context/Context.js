import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const [showMenu, setShowMenu] = useState(false);
  const [postImage, setPostImage] = useState();
  const [caption, setCaption] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [totalUserPosts, setTotalUserPosts] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalFollowed, setTotalFollowed] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password === confirmPassword) {
        const response = await axios.post(`${BASE_API_URI}/user/signup`, {
          name,
          email,
          password,
          address,
          phone,
        });
        toast.success(response.data.msg);
        navigate('/');
      } else {
        toast.error('password does not match');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data, status } = await axios.post(`${BASE_API_URI}/user/login`, {
        email,
        password,
      });

      if (status >= 200 && status < 300) {
        // Check if the response status is in the success range
        toast.success(data.msg);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        navigate('/dashboard');
      } else {
        toast.error(data.msg || 'Login failed. Please try again.'); // Fallback message
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.msg || 'An error occurred. Please try again.'; // Extract error message
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    toast.success('Logout successfully');
    navigate('/');
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URI}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setTotalFollowed(response.data.user.friendList.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_API_URI}/feeds/`,
        { userId, imageUrl: postImage, caption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsShow(false);
      toast.success(response.data.msg);

      setCaption('');
      getFeeds();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFeeds = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_API_URI}/feeds/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeeds(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getUserFeeds = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_API_URI}/feeds/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeeds(response.data);
      setTotalUserPosts(response.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const userPostCount = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_API_URI}/feeds/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUserPosts(response.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeed = async (feedId) => {
    try {
      const response = await axios.delete(`${BASE_API_URI}/feeds/${feedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.msg);
      getFeeds();
    } catch (err) {
      console.log(err);
    }
  };

  const editFeed = async (feedId) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (feedId) => {
    try {
      if (comment !== '') {
        const response = await axios.post(
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
        toast(response.data.msg);
      } else {
        toast.warn('Add Comment');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async (feedId) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      toast.success(response.data.msg);
      getFeeds();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const followOrUnfollow = async (friendId) => {
    try {
      if (friendId && userId) {
        const response = await axios.post(
          `${BASE_API_URI}/user/${userId}`,
          { userId: friendId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.msg);
        getUser();

        console.log(response);
      }
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
        showMenu,
        setShowMenu,
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
        loading,
        setLoading,
        totalFollowed,
        setTotalFollowed,
        followOrUnfollow,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
