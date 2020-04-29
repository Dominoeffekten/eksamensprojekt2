const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  picture: {
    type: String
  },
  text: {
    type: String,
    required: true,
  },
  tag: [],
  created: {
    type: Date,
    default: Date.now
  },
  replyTo: {
    type: String,
    default: "none"
  }
});

const Post = mongoose.model('Post', PostSchema, 'post');

module.exports = Post;