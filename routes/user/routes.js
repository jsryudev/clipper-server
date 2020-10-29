'use strict';

const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('../users/model');
const auth = require('../../middleware/auth');
const { verify } = require('./verify');

const router = express.Router();

// with Access Token
router.get('/', auth, async (req, res) => {
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

// Sign up
router.post('/', async (req, res) => {
  try {
    const identifier = await verify(req.body.token);
    req.body.identifier = identifier;

    const user = new User(req.body);
    await user.save();

    const result = _.omit(user.toObject(), ['identifier', '__v']);
    result.accessToken = jwt.sign(result, process.env.CLIPPER_JWT_SECRET);

    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Sign in
router.post('/google-login', async (req, res) => {
  try {
    const identifier = await verify(req.body.token);

    const user = await User.findOne({ identifier: identifier });
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
