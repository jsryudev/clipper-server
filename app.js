'use strict';

require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// routers
const users = require('./routes/users/routes');

mongoose.connect(process.env.CLIPPER_MONGO, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
const db = mongoose.connection;

db.on('error', err => {
  console.error(err);
});

db.once('connected', () => {
  console.log('Mongo connected!');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users);

module.exports = app;
