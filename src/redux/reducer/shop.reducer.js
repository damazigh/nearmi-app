import {
  ADDRESS_UPDATED,
  CREATE_SHOP,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  RESTORE_FORM_VALUE,
  RESTORE_FORM_VALUE_COMPLETED,
} from '../type';

const initialState = {
  creation: {
    navigationNextShop: false,
    restoreFormValues: false,
    submitCreation: false,
  },
  address: null,
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
    case ADDRESS_UPDATED:
      newState = Object.assign({}, state);
      newState.address = action.address;
      return newState;
    case CREATE_SHOP:
      newState = Object.assign({}, state);
      newState.creation.submitCreation = true;
      return newState;
    default:
      return initialState;
  }
}
