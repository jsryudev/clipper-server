const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  clips: [
    {
      type: mongoose.ObjectId,
      ref: 'Clip',
    },
  ],
});

markerSchema.index({ location: '2dsphere' });

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
