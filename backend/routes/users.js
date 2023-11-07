"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { createToken } = require('../helpers/token');
//const { ensureAdmin, ensureCorrectUserOrAdmin } = require('../middleware/auth');

// POST register new user and token
router.post('/register', async function(req, res, next){
  try{
    const user = await User.regUser(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch(err) {
    return next(err);
  }
});

// GET all users
// Returns { users: [{ username, first/last_name, email }]}
// Requires admin or returns error
router.get('/', async function(req, res, next){
  try{
    const user = await User.findAll();
    return res.json({ user });
  } catch(err){
    return next(err);
  }
});

// GET return specific user
// Returns { username, first/last_name, isAdmin }
// Requires admin or correct user
router.get('/:username', async function(req, res, next){
  try {
    const user = await User.getUser(req.params.username);
    return res.json( user );
  } catch(err) {
    return next(err);
  }
});

// UPDATE specific user
// Data can include { first/last_name, email, password }
// Returns { username, first/last_name, email, password, isAdmin }
// Authorization requires correct user or admin
router.patch('/:username', async function(req, res, next){
  try {
    const user = await User.updateUser(req.params.username, req.body);
    return res.json({ user });
  } catch(err) {
    return next(err);
  }
});

// DELETE specific user
// Requires admin or correct user
router.delete('/:username', async function(req, res, next){
  try {
    await User.delUser(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch(err) {
    return next(err);
  }
});

module.exports = router;