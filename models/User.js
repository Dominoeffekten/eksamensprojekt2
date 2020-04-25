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
  picture: { 
    type: String 
  },
  following: [],
  followers: [],
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;