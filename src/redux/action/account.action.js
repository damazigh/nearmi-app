import {
  LNG_CHANGE,
  TOOLBAR_MENU_ICON_DISPLAY,
  TOOLBAR_MENU_ICON_HANDLED,
  TOOLBAR_MENU_ICON_TOGGLED,
  UPDATE_LOADING,
} from '../type';

export const languageChanges = (lng) => ({ type: LNG_CHANGE, lng: lng });
/**
 * show hide tool bar menu icon
 */
export const toolbarMenuIconDisplay = (dis) => ({
  type: TOOLBAR_MENU_ICON_DISPLAY,
  displayed: dis,
});

/**
 * dispatch event to allow handling the click on menu icon
 */
export const toolbarMenuIconToggled = () => ({
  type: TOOLBAR_MENU_ICON_TOGGLED,
});

export const toolbarMenuIconHandled = () => ({
  type: TOOLBAR_MENU_ICON_HANDLED,
});

export const updateLoadingState = (loading) => ({
  type: UPDATE_LOADING,
  loading: loading,
});
