/**
 * suscribe to click on next button in shop creation stepper
 */
export const shopCreationNextStepSelector = (state) => {
  return state.shopReducer.creation.navigationNextShop;
};
/**
 * TODO verfier l'utilité de ce selecteur
 */
export const shopCreationRestoreValues = (state) =>
  state.shopReducer.creation.restoreFormValues;

/**
 * susbcribe to address update
 */
export const addressSelector = (state) => state.shopReducer.address;
