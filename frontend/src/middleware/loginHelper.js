import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class loginHelper{
  static token;
  static async request(endpoint, data = {}, method = 'get'){
    console.debug('DB Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${loginHelper.token}`};
    const params = (method === 'get')
          ? data
          : {};
    try{
      return (await axios({ url, method, data, params, headers })).data;
    } catch(err){
      console.error('DB Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message: [message];
    }
  };

  static async login(data){
    let res = await this.request(`auth/login`, data, 'post');
    return res.token;
  };

  static async getCurrentUser(username){
    let res = await this.request(`users/member/${username}`);
    return res.user;
  }
};

export default loginHelper;