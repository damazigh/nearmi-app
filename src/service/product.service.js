import { dataURItoBlob } from '../utils/utils';
import { shopAxios } from './axios-http.service';
import Logger from 'js-logger';
/**
 * submit product creation to the backend
 * @param {string} shopId
 * @param {object} product
 */
const createProduct = (shopId, product, metadata) => {
  const formData = new FormData();
  const boundaries = [];
  metadata.forEach((m) => {
    formData.append('images', dataURItoBlob(m.data), m.originalName);
    boundaries.push({ height: m.height, width: m.width, name: m.name });
  });
  product.boundaries = boundaries;
  formData.append(
    'data',
    new Blob([JSON.stringify(product)], { type: 'application/json' })
  );
  if (Logger.enabledFor(Logger.DEBUG)) {
    Logger.debug(
      '[product-service] - submitting product creation ' +
        JSON.stringify(product)
    );
  }
  return shopAxios.post(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/${shopId}/product`,
    formData,
    {
      headers: {
        'Content-Type': undefined,
      },
    }
  );
};
const createInMemoryImage = (imageWrapper) => {
  const url = URL.createObjectURL(dataURItoBlob(imageWrapper.data));
  const res = {
    url,
    height: imageWrapper.boundaries.height,
    width: imageWrapper.boundaries.width,
    name: url, // used in inmemory gallery to retrieve a file by url as we cas have several file with same name
    data: imageWrapper.data,
    originalName: imageWrapper.name,
  };
  Logger.debug('created image url ' + JSON.stringify(res));
  return res;
};

const getProducts = (shopId, offset, limit) => {
  return shopAxios.get(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/${shopId}/product?offset=${offset}&limit=${limit}`
  );
};

const ProductService = {
  createInMemoryImage,
  createProduct,
  getProducts,
};
export default ProductService;
