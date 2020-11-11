'use strict';

const express = require('express');
const Marker = require('./model');
const _ = require('lodash');
const Clip = require('../clips/model');

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const latitude = parseFloat(req.query.lat);
    const longitude = parseFloat(req.query.lng);

    const founds = await Marker.find({
      $and: [
        {
          'coordinate.longitude': {
            $gte: (longitude - 1).toFixed(7),
            $lte: (longitude + 1).toFixed(7),
          },
        },
        {
          'coordinate.latitude': {
            $gte: (latitude - 1).toFixed(7),
            $lte: (latitude + 1).toFixed(7),
          },
        },
      ],
    });
    res.json(founds);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id/clips', async (req, res) => {
  try {
    const founds = await Clip.find({ parentId: req.params.id });
    res.json(founds);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
