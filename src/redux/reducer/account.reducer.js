import { ANONYMOUS, LNG_CHANGE, USER_AUTHENTICATED } from '../type';

const initialState = {
  loggedIn: false,
  currentLanguage: 'en',
  user: null,
};

let newState = null;
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LNG_CHANGE:
      newState = Object.assign({}, state);
      newState.currentLanguage = action.lng;
      return newState;
    case USER_AUTHENTICATED:
      newState = Object.assign({}, state);
      newState.user = action.user;
      newState.loggedIn = true;
      return newState;
    case ANONYMOUS:
      newState = Object.assign({}, state);
      newState.user = null;
      newState.loggedIn = false;
      return newState;
    default:
      return initialState;
  }
}
export default accountReducer;
