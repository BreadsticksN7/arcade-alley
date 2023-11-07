"use strict";
const express = require('express');
const router = express.Router();
const IGDB = require('../models/igdb');

// GET games released in the last week
router.get('/', async function(req, res, next){
 try{
  const games = await IGDB.getLatest();
  return res.status(201).json({ games });
  } catch(err){
  return next(err);
 }
});

// GET games being released in the upcoming two weeks
router.get('/upcoming', async function(req, res, next){
  try{
   const games = await IGDB.getUpcoming();
   return res.status(201).json({ games });
  } catch(err){
   console.error(err.message);
   return next(err);
  }
});

// GET search by query
router.get('/search', async function(req, res, next){
  try{
   //const games = await IGDB.searchGame();
   //console.log(games);
   return res.status(201).json({ res: "Testing search" });
  } catch(err){
   return next(err);
  }
});

// GET game based on ID
router.get('/:id', async function(req, res, next){
  try{
   const game = await IGDB.postGame(req.params.id);
   return res.status(201).json(game);
  } catch(err){
   return next(err);
  }
});

module.exports = router;