import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const userAxios = axios.create({
  baseURL: process.env.REACT_APP_USER_ENDPOINT,
});

const shopAxios = axios.create({
  baseURL: process.env.REACT_APP_SHOP_ENDPOINT,
});

export { shopAxios, userAxios };
