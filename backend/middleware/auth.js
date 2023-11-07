"use strict";

// Handles authorization cases in routes
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../middleware/expressError');

// Authenticate user
// If token was provided verify and if valid store the token payload
// in res.locals (includes username and isAdmin fields)
function authenticateJWT(req, res, next){
  try{
    const authHeader = req.headers && req.headers.authorization;
    if(authHeader){
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch(err){
    return next();
  }
};

// Requires login, otherwise raises Unauthorized error
function ensureLoggedIn(req, res, next){
  try{
    if(!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch(err){
    return next(err);
  }
};

// Requires admin, otherwise raises Unauthorized error
function ensureAdmin(req, res, next){
  try{
    if(!res.locals.user || !res.locals.user.isAdmin){
      throw new UnauthorizedError();
    }
    return next();
  } catch(err){
    return next(err);
  }
};

// Verifies token and user match the provided username or isAdmin
// Otherwise raises Unauthorized error
function ensureCorrectUserOrAdmin(req, res, next){
  try{
    if(!(user && (user.isAdmin || user.username === req.params.username))){
      throw new UnauthorizedError();
    }
    return next();
  } catch(err){
    return next(err);
  }
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin
};