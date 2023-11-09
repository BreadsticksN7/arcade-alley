"use strict";

// Express App for Arcade-Alley
// Required packages
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Required middleware
const { NotFoundError } = require('./middleware/expressError');
const { authenticateJWT } = require('./middleware/auth');

// Routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/games', gameRoutes);
app.use('/users', userRoutes);

// Handle 404 errors
app.use(function (req, res, next){
    return next(new NotFoundError());
  });

// Unhandled Errors
app.use(function (err, req, res, next){
  if (process.env.NODE_ENV !== "dev") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;