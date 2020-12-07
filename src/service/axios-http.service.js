import axios from 'axios';

const userAxios = axios.create({
  baseURL:  process.env.REACT_APP_USER_ENDPOINT,
  headers: {'Content-Type' : 'application/json'}
});

const shopAxios = axios.create({
  baseURL:  process.env.REACT_APP_SHOP_ENDPOINT,
  baseURL: process.env.REACT_APP_ADDR_ENDPOINT,
});

const addrAxios = axios.create({
  baseURL: process.env.REACT_APP_ADDR_ENDPOINT,
  baseURL: process.env.REACT_APP_ADDR_ENDPOINT,
});

export {userAxios, shopAxios, addrAxios};