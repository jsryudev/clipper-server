'use strict';

const express = require('express');
const Marker = require('./model');
const Clip = require('../clips/model');

const router = express.Router();

// Get all markers
router.get('/', async (req, res) => {
  try {
    const founds = await Marker.find();
    res.json(founds);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get near markers
router.get('/near', async (req, res) => {
  try {
    const founds = await Marker.find()
      .where('clips')
      .slice(5)
      .populate('clips')
      .where('location')
      .near({
        center: [req.query.lng, req.query.lat],
        spherical: true,
      })
      .maxDistance(req.query.offset);

    res.json(founds);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a marker
router.get('/:id', async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.id);
    res.json(marker);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all marker's clips
router.get('/:id/clips', async (req, res) => {
  const options = {
    page: req.query.page,
    limit: req.query.limit,
  };

  try {
    const founds = await Clip.paginate({ parentId: req.params.id }, options);
    res.json(founds);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create a marker's clip
router.post('/:id/clips', async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.id);
    marker.clips.push(req.body);
    await marker.save();

    res.json(req.body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
