const express = require('express');
const logger = require('morgan');

// routers
const users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users);

module.exports = app;
