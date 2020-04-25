const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  postID: {
    type: Number,
    required: true,
    unique: true
  },
  picture: {
    type: String
  },
  text: {
    type: String,
    required: true,
  },
  tag: [],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema, 'post');

module.exports = Post;