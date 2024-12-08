import { model, Schema } from 'mongoose';
import { commentSchema } from './comment.js';

const feedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feeds = model('Feeds', feedSchema);

export default Feeds;
