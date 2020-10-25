'use strict';

const express = require('express');
const User = require('./model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await User.find({});
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
