import {
  ADDRESS_UPDATED,
  SHOP_CONFIG_LOADED,
  CREATE_SHOP,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  UPDATE_MANAGED_SHOP,
  UPDATE_VISITIED_SHOP,
  UPDATE_LOADED_PRODUCT,
  FETCH_MORE_PRODUCT,
  PRODUCT_DELETED_BY_PRO,
} from '../type';

/**
 * event used in stepper component for dispatching nextStep hitted on step where an alert is set
 */
export const startedNavigationToNextShopStep = () => {
  return { type: NEXT_SHOP_CREATION_STEP };
};

/**
 * event used from creation sub step to notify that the previous click on next button was handled correctly
 */
export const handledNextStep = () => {
  return { type: HANDLED_NEXT_SHOP_CREATION_STEP };
};
/**
 * event dispatched when user select an address<br/> addess is stored for later uses
 * @param {*} addr
 */
export const addressUpdated = (addr) => {
  return { type: ADDRESS_UPDATED, address: addr };
};

/**
 *
 */
export const createShop = () => {
  return { type: CREATE_SHOP };
};

/**
 * update the managed shop (event related to pro user managing his shops)
 * @param {*} shop
 */
export const updateManagedShop = (shop) => {
  return { type: UPDATE_MANAGED_SHOP, data: shop };
};

/**
 * dispatch the loaded shop configuration (should happens once at app loading)
 * @param {*} config
 */
export const shopConfLoaded = (config) => {
  return { type: SHOP_CONFIG_LOADED, data: config };
};
/**
 * update the visited shop in the store with the given shop
 * in param
 * @param {*} shop
 */
export const updateVistedShop = (shop) => ({
  type: UPDATE_VISITIED_SHOP,
  shop: shop,
});

export const updateLoadedProduct = (products, offset, limit) => ({
  type: UPDATE_LOADED_PRODUCT,
  loadedProducts: {
    products,
    offset,
    limit,
  },
});

export const fetchMoreProduct = () => ({ type: FETCH_MORE_PRODUCT });

export const deletedProduct = (productId) => ({
  type: PRODUCT_DELETED_BY_PRO,
  deletedProductId: productId,
});
