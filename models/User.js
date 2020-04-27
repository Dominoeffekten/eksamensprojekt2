const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  darkTheme: {
    type: Boolean,
    default: true
  },
  approved: {
    type: Boolean,
    default: false
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
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: { 
    type: String,
    default: "images/avatar.jpeg"
  },
  following: [],
  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;