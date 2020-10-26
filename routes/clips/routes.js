'use strict';

const express = require('express');
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

// Nearby clips
router.post('/nearby', async (req, res) => {
  try {
    const result = await Clip.find({
      $and: [
        { 'coordinate.longitude': { $gt: req.body.lng - req.body.offset } },
        { 'coordinate.longitude': { $lt: req.body.lng + req.body.offset } },
        { 'coordinate.latitude': { $gt: req.body.lat - req.body.offset } },
        { 'coordinate.latitude': { $lt: req.body.lat + req.body.offset } },
      ],
    });
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const clip = new Clip(req.body);
    await clip.save();
    res.json(clip);
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
