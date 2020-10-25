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
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
