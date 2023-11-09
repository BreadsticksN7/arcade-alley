"use strict";
const express = require('express');
const router = express.Router();
const IGDB = require('../models/igdb');

// Create UTC timestamp and converts to seconds
// Conversion required by API when passing query
let dateTime = Math.floor(Date.now() / 1000);

// GET games released in the last week
router.get('/', async function(req, res, next){
  try{
    // Fetches dateTime 7 days prior
    let lastWeek = dateTime - 7 * 24 * 60 * 60;
    const games = await IGDB.getLatest(dateTime, lastWeek);
    return res.status(201).json({ games });
  } catch(err){
    return next(err);
 }
});
// GET game based on ID
router.get('/id/:id', async function(req, res, next){
  try{
    const game = await IGDB.postGame(req.params.id);
    return res.status(201).json(game);
  } catch(err){
    return next(err);
  }
});

// GET games being released in the upcoming two weeks
router.get('/upcoming', async function(req, res, next){
  try{
    // Fetches dateTime 14 days ahead
    let nextWeek = dateTime + 14 * 24 * 60 * 60;
    const games = await IGDB.getUpcoming(dateTime, nextWeek);
    return res.status(201).json({ games });
  } catch(err){
    console.error(err.message);
    return next(err);
  }
});

// GET search by query
router.post('/search', async function(req, res, next){
  try{
   const games = await IGDB.searchGame(req.body);
   console.log(req.body);
   return res.status(201).json({ games });
  } catch(err){
   return next(err);
  }
});

module.exports = router;