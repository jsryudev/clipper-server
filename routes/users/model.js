const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['apple', 'google'],
  },
  identifier: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
