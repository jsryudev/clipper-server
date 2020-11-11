const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.ObjectId,
    ref: 'Marker',
    required: true,
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
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
});

const Clip = mongoose.model('Clip', clipSchema);

module.exports = Clip;
