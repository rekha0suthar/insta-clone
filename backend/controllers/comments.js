import Feeds from '../models/feeds.js';

// @desc  Add Comment
// @route POST /api/feeds/:id/comments
// @access private
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    const feed = await Feeds.findById(id);
    feed.comments.push({ userId, feedId: id, comment });
    await feed.save();
    res.status(201).json({ msg: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch Comments
// @route GET /api/feeds/:id/comments
// @access private
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feeds.findById(id)
      .populate('comments.userId', 'name address') // Populate userId in comments
      .exec();

    if (!feed) {
      return res.status(404).json({ msg: 'Feed not found' });
    }

    res.status(200).json(feed.comments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getComments, addComment };
