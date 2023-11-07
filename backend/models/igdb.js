"use strict";
const axios = require('axios');
// IGDB API routes
const BASE_API_URL = 'https://api.igdb.com/v4';
const GAMES_API = '/games';

// axios headers used in each query
axios.defaults.headers.common['Authorization'] = process.env.IGDB_API_AUTHORIZATION;
axios.defaults.headers.common['Client-ID'] = process.env.IGDB_API_CLIENT_ID;

// timestamps to seconds for passing into query
let dateTime = Math.floor(Date.now() / 1000);

class IGDB {
  // Displays games released in the last week
  // Date is based on timestamp provided
  static async getLatest(){
    let lastWeek = dateTime - 7 * 24 * 60 * 60;
    const query = `fields first_release_date,name,cover.id,cover.image_id; where themes != (42) & status = n & category != (1,2,5,6,7) & platforms = (167,169) & first_release_date > ${lastWeek} & first_release_date < ${dateTime} & first_release_date != null & cover != null & cover.image_id != null; limit 5;`;

    let res = await axios.post(BASE_API_URL + GAMES_API, query);
    return res.data;
  };

  // Displays games beig released in the next two weeks
  // Date is based on timestamp provided
  static async getUpcoming(){
   let nextWeek = dateTime + 14 * 24 * 60 * 60;
    const query = `fields first_release_date,name,cover.id,cover.image_id; where themes != (42) & status = n & category != (1,2,5,6,7) & platforms = (167,169) & first_release_date > ${dateTime} & first_release_date < ${nextWeek} & first_release_date != null & cover != null & cover.image_id != null; limit 5;`;

    let res = await axios.post(BASE_API_URL + GAMES_API, query);
    return res.data;
  };

  // Find game(s) by searching with provided query
  static async searchGame(search){
    let gameSearch = search;
    let query = `fields name,cover.id,cover.image_id; where cover.image_id != null; search "${gameSearch}";`;

    let res = await axios.post(BASE_API_URL + GAMES_API, query);
    return res.data;
  };

  // Find game by ID
  static async postGame(gameId){
    let query = `fields first_release_date,genres.name,name,platforms.name,summary,url,cover.id,cover.image_id; where id = ${gameId};`;

    let res = await axios.post(BASE_API_URL + GAMES_API, query);
    return res.data;
  };
};

module.exports = IGDB;