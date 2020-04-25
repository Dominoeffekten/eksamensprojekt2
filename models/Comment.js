const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  postID: {
    type: Number,
    required: true
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

const Comment = mongoose.model('Comment', CommentSchema, 'comment');

module.exports = Comment;