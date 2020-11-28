'use strict';

const express = require('express');
const _ = require('lodash');
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
  try {
    const marker = await Marker.findById(req.params.id).populate('clips');
    res.json(marker.clips);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create a marker's clip
router.post('/:id/clips', async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.id);

    const body = req.body;
    body.author = '5f958e91a37440b4fa5f679b';

    const clip = new Clip(body);
    marker.clips.push(clip);

    await marker.save();
    await clip.save();

    res.json(clip);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
