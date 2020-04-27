const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  approved: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: { 
    type: String 
  },
  following: [],
  followers: [],
  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;