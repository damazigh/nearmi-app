import {
  ADDRESS_UPDATED,
  SHOP_CONFIG_LOADED,
  CREATE_SHOP,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  UPDATE_MANAGED_SHOP,
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
