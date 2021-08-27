'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    req.decoded = jwt.verify(token, process.env.CLIPPER_JWT_SECRET);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        resultCode: 419,
        meesage: 'Token expired',
      });
    }

    return res.status(401).json({
      resultCode: 401,
      message: 'Token is not valid',
    });
  }
};
