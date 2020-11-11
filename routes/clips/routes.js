'use strict';

const express = require('express');
const _ = require('lodash');
const Marker = require('../markers/model');
const Clip = require('./model');

const router = express.Router();

// Get all clips
router.get('/', async (req, res) => {
  try {
    const result = await Clip.find({});
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Nearby clips
router.get('/nearby', async (req, res) => {
  try {
    const latitude = parseFloat(req.query.lat);
    const longitude = parseFloat(req.query.lng);

    const result = await Clip.find({
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
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a clip
router.get('/:id', async (req, res) => {
  try {
    const result = await Clip.findById(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create a clip
router.post('/', async (req, res) => {
  try {
    const latitude = req.body.coordinate.latitude;
    const longitude = req.body.coordinate.longitude;

    const body = _.omit(req.body, ['coordinate']);

    const found = await Marker.findOne({
      'coordinate.latitude': latitude,
      'coordinate.longitude': longitude,
    });

    if (found) {
      body.parentId = found.id;
      const clip = new Clip(body);
      const result = await clip.save();
      res.json(result);
    } else {
      const marker = new Marker({
        'coordinate.latitude': latitude,
        'coordinate.longitude': longitude,
      });

      const saved = await marker.save();
      body.parentId = saved.id;

      const clip = new Clip(body);
      const result = await clip.save();
      res.json(result);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const result = await Clip.findByIdAndUpdate(
      req.params.id,
      req.request.body,
      {
        runValidators: true,
      },
    );
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const result = await Clip.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
