'use strict';

const express = require('express');

const router = express.Router();

const users = require('./users/routes');
const clips = require('./clips/routes');

router.use('/users', users);
router.use('/clips', clips);

module.exports = router;
