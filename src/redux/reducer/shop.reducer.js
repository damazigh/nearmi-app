import {
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  RESTORE_FORM_VALUE,
  RESTORE_FORM_VALUE_COMPLETED,
} from '../type';

const initialState = {
  creation: {
    navigationNextShop: false,
    restoreFormValues: false,
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
    case RESTORE_FORM_VALUE:
      newState = Object.assign({}, state);
      newState.creation.restoreFormValues = true;
      return newState;
    case RESTORE_FORM_VALUE_COMPLETED:
      newState = Object.assign({}, state);
      newState.creation.restoreFormValues = false;
      return newState;
    default:
      return initialState;
  }
}
