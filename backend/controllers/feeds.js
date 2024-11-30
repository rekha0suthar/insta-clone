import Feeds from '../models/feeds.js';

// @desc  Create Feed
// @route POST /api/feeds/
// @access private
const createFeed = async (req, res) => {
  try {
    const { userId, imageUrl, caption } = req.body;

    const newFeed = await new Feeds({
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
    const feeds = await Feeds.find();

    response.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch Feed
// @route GET /api/feeds/:id
// @access private
const getUserFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feeds.findById(id);

    response.status(200).json(feed);
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

export { createFeed, getFeeds, getUserFeed, updateFeed, deleteFeed };
