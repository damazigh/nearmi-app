import {
  LNG_CHANGE,
  TOOLBAR_MENU_ICON_DISPLAY,
  TOOLBAR_MENU_ICON_HANDLED,
  TOOLBAR_MENU_ICON_TOGGLED,
} from '../type';

const initialState = {
  currentLanguage: 'en',
  toolbarMenuIconDisplayed: false,
  toolbarMenuIconToggled: false,
};

let newState = null;
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LNG_CHANGE:
      newState = Object.assign({}, state);
      newState.currentLanguage = action.lng;
      return newState;
    case TOOLBAR_MENU_ICON_TOGGLED:
      newState = Object.assign({}, state);
      newState.toolbarMenuIconToggled = true;
      return newState;
    case TOOLBAR_MENU_ICON_DISPLAY:
      newState = Object.assign({}, state);
      newState.toolbarMenuIconDisplayed = action.displayed;
      return newState;
    case TOOLBAR_MENU_ICON_HANDLED:
      newState = Object.assign({}, state);
      newState.toolbarMenuIconToggled = false;
      return newState;
    default:
      return initialState;
  }
}
export default accountReducer;
