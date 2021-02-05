export const currentLngSelector = (state) =>
  state.accountReducer.currentLanguage;

export const toolbarMenuIconClick = (state) =>
  state.accountReducer.toolbarMenuIconToggled;

export const shouldDisplaytoolbarMenuIcon = (state) =>
  state.accountReducer.toolbarMenuIconDisplayed;
