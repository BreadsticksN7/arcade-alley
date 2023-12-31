"use strict";

// Authentication routes: generates a token / registers new user + token
const express = require('express');
const router = new express.Router();
const { BadRequestError } = require('../middleware/expressError');
const { createToken } = require('../helpers/token');
const jsonschema = require('jsonschema');
const User = require('../models/user');
const userAuthSchema = require('../schemas/userAuth.json');
const userRegisterSchema = require('../schemas/userRegister.json');

// POST /auth/login
// { username, password } returns { token }
// JWT token to authenicate future requests
router.post('/login', async function(req, res, next){
  try{
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch(err){
    return next(err);
  }
});

// POST /auth/register
// User must include { username, password, email }
// Returns token to authenticate future requests
router.post('/register', async function(req, res, next){
  try{
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if(!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const newUser = await User.regUser({ ...req.body, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch(err){
    return next(err);
  }
});

module.exports = router;