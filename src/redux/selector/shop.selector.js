/**
 * suscribe to click on next button in shop creation stepper
 */
export const shopCreationNextStepSelector = (state) => {
  return state.shopReducer.creation.navigationNextShop;
};
/**
 * TODO verfier l'utilité de ce selecteur
 */
export const shopCreationRestoreValues = (state) =>
  state.shopReducer.creation.restoreFormValues;

/**
 * susbcribe to address update
 */
export const addressSelector = (state) => state.shopReducer.address;
/**
 * get managed shop by pro user
 */
export const getManagedShop = (state) => state.shopReducer.shop;

/**
 * get maximum limit of authorized image to upload for one shop
 * @param {*} state
 */
export const getMaxImageForShopSelector = (state) =>
  state.shopReducer.shopConfig.maxImageForShop;

/**
 * get accepted mime images
 * @param {*} state
 */
export const getAcceptedImgMimeSelector = (state) =>
  state.shopReducer.shopConfig.acceptedImageMime;
/**
 * get visited shop
 * @param {*} state redux state
 */
export const getVisitedShopSelector = (state) => state.shopReducer.shop;
/**
 * get the already fetched product for shop
 * @param {*} state fetched product for shop
 */
export const getfetchedProductsSelector = (state) =>
  state.shopReducer.loadedProducts;
