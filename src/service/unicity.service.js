import { shopAxios } from './axios-http.service';

/**
 * * check wether a given value already exist in given field for a known product
 * the search is limited to the referenced shop (ie shopId)
 * @param {string} field (where to check)
 * @param {string} value what to check
 * @param {string} shopId targeted shop
 */
const productUnicity = (field, value, shopId) => {
  return shopAxios.get(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/unicity/${shopId}/product?field=${field}&value=${value}`
  );
};
const UnicityService = {
  productUnicity,
};

export default UnicityService;
