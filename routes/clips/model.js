const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const clipSchema = new mongoose.Schema({
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
    required: true,
  },
});

clipSchema.plugin(mongoosePaginate);
const Clip = mongoose.model('Clip', clipSchema);

module.exports = Clip;
