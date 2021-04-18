import { DEFAULT_PAGINATION_PAGE_SIZE } from '../../utils/constants';
import {
  ADDRESS_UPDATED,
  CREATE_SHOP,
  FETCH_MORE_PRODUCT,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  PRODUCT_DELETED_BY_PRO,
  SHOP_CONFIG_LOADED,
  TOOLBAR_MENU_ICON_DISPLAY,
  TOOLBAR_MENU_ICON_TOGGLED,
  UPDATE_LOADED_PRODUCT,
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
  loadedProducts: {
    products: [], //loaded product
    offset: 0, // actual page index
    limit: DEFAULT_PAGINATION_PAGE_SIZE, // default page size
  },
  fetcheMore: 0, // notify component to fetch more product
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
    // happens when fetching more product from backend
    case UPDATE_LOADED_PRODUCT:
      newState = Object.assign({}, state);
      const newLoadedProduct = {};
      newLoadedProduct.products = [
        ...state.loadedProducts.products,
        ...action.loadedProducts.products,
      ];
      newLoadedProduct.offset = action.loadedProducts.offset;
      newLoadedProduct.limit = action.loadedProducts.limit;
      newState.loadedProducts = newLoadedProduct;
      return newState;
    case FETCH_MORE_PRODUCT:
      newState = Object.assign({}, state);
      newState.fetcheMore = ++state.fetcheMore;
      return newState;
    case PRODUCT_DELETED_BY_PRO:
      newState = Object.assign({}, state);
      const nlp = {};
      nlp.products = [
        ...state.loadedProducts.products.filter(
          (p) => p.id !== action.deletedProductId
        ),
      ];
      nlp.offset = state.loadedProducts.offset;
      nlp.limit = state.loadedProducts.limit;
      newState.loadedProducts = nlp;
      return newState;
    default:
      return state;
  }
}
