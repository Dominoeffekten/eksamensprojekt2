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
  comment: [ {
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
    }
  } ]
});

const Post = mongoose.model('Post', PostSchema, 'post');

module.exports = Post;