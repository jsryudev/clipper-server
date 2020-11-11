const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  coordinate: {
    longitude: {
      type: Number,
      require: true,
      unique: true,
    },
    latitude: {
      type: Number,
      require: true,
      unique: true,
    },
  },
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
