'use strict';

const express = require('express');
const User = require('./model');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await User.find({});
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get a user
router.get('/:id', async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
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
    const result = await User.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
