const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

clipSchema.plugin(mongoosePaginate);
const Clip = mongoose.model('Clip', clipSchema);

module.exports = Clip;
