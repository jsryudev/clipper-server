'use strict';

const express = require('express');
const _ = require('lodash');
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

module.exports = router;
