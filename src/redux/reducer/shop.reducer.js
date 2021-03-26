import {
  ADDRESS_UPDATED,
  CREATE_SHOP,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  SHOP_CONFIG_LOADED,
  TOOLBAR_MENU_ICON_DISPLAY,
  TOOLBAR_MENU_ICON_TOGGLED,
  UPDATE_MANAGED_SHOP,
  UPDATE_VISITIED_SHOP,
} from '../type';

const initialState = {
  creation: {
    navigationNextShop: false,
    restoreFormValues: false,
    submitCreation: false,
  },
  address: null,
  shop: null,
  shopConfig: null,
  visitedShop: null,
};

let newState = null;
export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_SHOP_CREATION_STEP:
      newState = Object.assign({}, state);
      newState.creation.navigationNextShop = true;
      return newState;

    case HANDLED_NEXT_SHOP_CREATION_STEP:
      newState = Object.assign({}, state);
      newState.creation.navigationNextShop = false;
      return newState;

    // happens when user update his address
    case ADDRESS_UPDATED:
      newState = Object.assign({}, state);
      newState.address = action.address;
      return newState;

    // happens when submittig shop creation
    case CREATE_SHOP:
      newState = Object.assign({}, state);
      newState.creation.submitCreation = true;
      return newState;

    // update the visited shop shop by admin
    case UPDATE_MANAGED_SHOP:
      newState = Object.assign({}, state);
      newState.shop = action.data;
      return newState;

    // happens when app loaded and config is fetched for backend
    case SHOP_CONFIG_LOADED:
      newState = Object.assign({}, state);
      newState.shopConfig = action.data;
      return newState;
    // happens when visiting detailed page of shop
    case UPDATE_VISITIED_SHOP:
      newState = Object.assign({}, state);
      newState.shop = action.shop;
      return newState;
    default:
      return state;
  }
}
