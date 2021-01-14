import {
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
} from '../type';

const initialState = {
  creation: {
    navigationNextShop: false,
  },
};
let newState = null;
export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_SHOP_CREATION_STEP:
      console.info('salut' + action.type);
      newState = Object.assign({}, state);
      newState.creation.navigationNextShop = true;
      return newState;
    case HANDLED_NEXT_SHOP_CREATION_STEP:
      newState = Object.assign({}, state);
      newState.creation.navigationNextShop = false;
      return newState;
    default:
      return initialState;
  }
}
