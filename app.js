'use strict';

require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const api = require('./routes/index');

mongoose.connect(process.env.CLIPPER_MONGO, {
  user: process.env.CLIPPER_MONGO_USER,
  pass: process.env.CLIPPER_MONGO_PASSWORD,
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
  console.log('Database connected.');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

module.exports = app;
