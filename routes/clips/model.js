const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
  coordinate: {
    longitude: {
      type: Number,
      require: true,
    },
    latitude: {
      type: Number,
      require: true,
    },
  },
  location: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    default: null,
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
    require: true,
  },
  likedUsers: [
    {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  ],
  dislikedUsers: [
    {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  ],
});

const Clip = mongoose.model('Clip', clipSchema);

module.exports = Clip;
