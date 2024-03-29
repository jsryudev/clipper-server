'use strict';

const express = require('express');
const _ = require('lodash');
const Marker = require('../markers/model');
const Clip = require('./model');

const auth = require('../../middleware/auth');

const router = express.Router();

// Get all clips
router.get('/', auth, async (req, res) => {
  try {
    const result = await Clip.find({});
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a clip
router.get('/:id', auth, async (req, res) => {
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

// Create a clip and marker
router.post('/', auth, async (req, res) => {
  try {
    const found = await Marker.findOne()
      .where('location')
      .near({
        center: [req.body.longitude, req.body.latitude],
        spherical: true,
      })
      .maxDistance(0);

    let marker;
    if (found) {
      marker = found;
    } else {
      const created = new Marker({
        location: {
          coordinates: [req.body.longitude, req.body.latitude],
        },
      });

      marker = created;
    }

    const body = _.omit(req.body, ['latitude', 'longitude']);
    const clip = new Clip(body);
    clip.author = req.decoded._id;

    marker.clips.push(clip);

    await marker.save();
    await clip.save();

    res.json(clip);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a clip
router.patch('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Clip.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
