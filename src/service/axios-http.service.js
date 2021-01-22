import axios from 'axios';


const authorizationInterceptor = (config) => {
  console.info('je suis dans l intercepteur');
  const token = `Bearer ${localStorage.getItem('accessToken')}`;
  config.headers.Authorization =  token;
  return config;
}

const userAxios = axios.create({
  baseURL:  process.env.REACT_APP_USER_ENDPOINT,
  headers: {'Content-Type' : 'application/json'}
});

const shopAxios = axios.create({
  baseURL:  process.env.REACT_APP_SHOP_ENDPOINT,
});

const addrAxios = axios.create({
  baseURL: process.env.REACT_APP_ADDR_ENDPOINT,
});

// attach interceptor for api axios instance

shopAxios.interceptors.request.use(config => authorizationInterceptor(config));
userAxios.interceptors.request.use(config => authorizationInterceptor(config));


export {userAxios, shopAxios, addrAxios};