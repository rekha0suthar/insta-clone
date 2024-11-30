import User from '../models/user.js';
import jwt from 'jsonwebtoken';
// @desc  User Registeration
// @route POST /api/user/signup
// @access public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).json({ msg: 'User already exists' });
    }

    const newUser = await new User({ name, email, password }).save();

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

export { signup, login };
