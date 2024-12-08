import Feeds from '../models/feeds.js';

// @desc  Create Feed
// @route POST /api/feeds/
// @access private
const createFeed = async (req, res) => {
  try {
    const { userId, imageUrl, caption } = req.body;

    await new Feeds({
      userId,
      imageUrl,
      caption,
    }).save();

    res.status(201).json({ msg: 'Feed created successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch Feeds
// @route GET /api/feeds/
// @access private
const getFeeds = async (req, res) => {
  try {
    const feeds = await Feeds.find()
      .populate('userId', 'name address')
      .sort({ createdAt: -1 }) // Sort the results before executing
      .exec();
    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch Feed
// @route GET /api/feeds/:userId
// @access private
const getUserFeeds = async (req, res) => {
  try {
    const { userId } = req.params;
    const feed = await Feeds.find({ userId })
      .populate('userId', 'name address')
      .sort({ createdAt: -1 }) // Sort the results before executing
      .exec();

    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Update Feed
// @route PUT /api/feeds/:id
// @access private
const updateFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, imageUrl, caption } = req.body;
    const feed = await Feeds.findByIdAndUpdate(
      id,
      { userId, imageUrl, caption },
      { new: true }
    );

    if (!feed) {
      return res.status(404).json({ msg: `Feed with id ${id} not found` });
    }

    res.status(200).json({ msg: `Feed with id ${id} updated successfully` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Delete Feed
// @route DELETE /api/feeds/:id
// @access private
const deleteFeed = async (req, res) => {
  try {
    const { id } = req.params;

    const feed = await Feeds.findByIdAndDelete(id);
    if (!feed) {
      return res.status(404).json({ msg: `Feed with id ${id} not found` });
    }

    res.status(200).json({ msg: `Feed with id ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Like or Unlike Feed
// @route POST /api/feeds/:id/like
// @access private
const likeOrUnlikeFeed = async (req, res) => {
  try {
    const { id } = req.params; // Get the feed ID from the request parameters
    const { userId } = req.body; // Get the user ID from the request body

    // Find the feed by ID
    const feed = await Feeds.findById(id);
    if (!feed) {
      return res.status(404).json({ msg: 'Feed not found' });
    }

    // Check if the user has already liked the feed
    const checkFeedLiked = feed.likes.includes(userId);
    if (checkFeedLiked) {
      // If the user has liked the feed, remove the user from the likes array
      feed.likes = feed.likes.filter((likeUser) => likeUser !== userId);
      await feed.save(); // Save the updated feed
      return res.status(200).json({ msg: 'Feed unliked' });
    }

    // If the user has not liked the feed, add the user to the likes array
    feed.likes.push(userId);
    await feed.save(); // Save the updated feed
    res.status(200).json({ msg: 'Feed liked' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  createFeed,
  getFeeds,
  getUserFeeds,
  updateFeed,
  deleteFeed,
  likeOrUnlikeFeed,
};
