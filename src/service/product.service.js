import { shopAxios } from './axios-http.service';

const create = (shopId) => {
  const formData = new FormData();
  return shopAxios.post('/api/shop/v1/pro/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const ProductService = {};
export default ProductService;
