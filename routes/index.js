'use strict';

const express = require('express');

const router = express.Router();

const user = require('./user/routes');
const users = require('./users/routes');
const markers = require('./markers/routes');
const clips = require('./clips/routes');

router.use('/user', user);
router.use('/users', users);
router.use('/markers', markers);
router.use('/clips', clips);

module.exports = router;
