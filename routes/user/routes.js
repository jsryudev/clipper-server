'use strict';

const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../users/model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.decoded._id);
    if (!user) {
      res.sendStatus(404);
    }
    const result = _.omit(user.toObject(), ['identifier', '__v']);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/google-id', async (req, res) => {
  // Google ID Token을 기준으로 userID 검증

  try {
    const user = await User.findOne({ identifier: '' });
    if (!user) {
      res.sendStatus(404);
    }

    const result = _.omit(user.toObject(), ['identifier', '__v']);
    result.accessToken = jwt.sign(result, process.env.CLIPPER_JWT_SECRET);

    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
