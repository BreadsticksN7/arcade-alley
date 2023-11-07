import axios from 'axios';
import { createTimeStamp } from './unixtime';

const Proxy = 'https://3688uqgp23.execute-api.us-west-2.amazonaws.com';
const base_test = '/production/v4';
const BASE_API_URL = 'https://api.igdb.com/v4';
const GAMES_API = '/games';
const HEADERS = {'Client-ID': 'iwvpt7x6l04bj9w7f4rh0u9ogd3lwq',
                'Authorization': 'Bearer ogqngiqe916qifu8xf53iixhxmnzd0'
                };

let dateTime = Math.floor(Date.now() / 1000);
let nextWeek = createTimeStamp(dateTime, 'add', 14);

class IGDBApi {
  static async getUpcoming(){
    const query = `fields first_release_date,name,cover.id,cover.image_id; where themes != (42) & status = n & category != (1,2,5,6,7) & platforms = (167,169) & first_release_date > ${dateTime} & first_release_date < ${nextWeek} & first_release_date != null & cover != null & cover.image_id != null; limit 5;`;
    let res = await axios.post(Proxy + base_test + GAMES_API, { headers: HEADERS});
    return res.json();
  };
};

export default IGDBApi;