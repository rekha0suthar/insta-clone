import { model, Schema } from 'mongoose';

const feedSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feeds = model('Feeds', feedSchema);

export default Feeds;
