import User from '../models/user.js';
import jwt from 'jsonwebtoken';
// @desc  User Registeration
// @route POST /api/user/signup
// @access public
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      userImage = '',
      address,
      phone,
      friendList = [],
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({ msg: 'User already exists' });
    }

    await new User({
      name,
      email,
      password,
      userImage,
      address,
      phone,
      friendList,
    }).save();

    res.status(201).json({ msg: 'User signup successfull' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  User Login
// @route POST /api/user/login
// @access public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const checkPassword = user.checkPassword(password);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    user.updateLogin();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ msg: 'User login successfull', token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch User Profile
// @route GET /api/user/:id
// @access private
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ msg: ' User does not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Update User Profile
// @route PUT /api/user/:id
// @access private
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { userImage, address, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { userImage, address, phone },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: `User with id ${id} not found` });
    }

    res.status(200).json({ msg: `User with id ${id} updated successfully` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Add Friend
// @route POST /api/user/:id
// @access private
const addOrRemoveFriend = async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;

    const user = await User.findById(id);

    const checkFriendExists = await user.friendList.includes(userId);

    if (checkFriendExists) {
      user.friendList.filter((friend) => friend !== userId);
      return res
        .status(200)
        .json({ msg: 'User removed from your friend list ' });
    }

    user.friendList.push(userId);
    res.status(200).json({ msg: 'User added to friend list' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { signup, login, getUser, updateUserProfile, addOrRemoveFriend };
