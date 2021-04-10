import { shopAxios } from './axios-http.service';
/**
 * ##############################################################
 * ######   product service is linked to shop as every is  ######
 * ######              related to shop                     ######
 * ##############################################################
 */

/**
 * list all product category linked to shop
 * @param {string} shopId
 */
const listProductCategory = (shopId) => {
  return shopAxios.get(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/${shopId}/product/category`,
    {
      headers: { 'Content-Type': ['application/json'] },
    }
  );
};

/**
 * create a list of product category and link them to a shop
 * @param {string} shopId
 * @param {array} categories
 */
const createProductCategories = (shopId, categories) => {
  return shopAxios.post(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/${shopId}/product/category`,
    categories,
    { headers: { 'Content-Type': 'application/json' } }
  );
};

/**
 * delete a product category by id
 * @param {*} shopId targeted shop id
 * @param {*} productCategoryId the id of the category to delete
 */
const deleteProductCategory = (shopId, productCategoryId) => {
  return shopAxios.delete(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/${shopId}/product/category/${productCategoryId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
const ProductCategoryService = {
  listProductCategory,
  createProductCategories,
  deleteProductCategory,
};
export default ProductCategoryService;
