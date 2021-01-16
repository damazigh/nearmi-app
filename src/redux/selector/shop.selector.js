export const shopCreationNextStepSelector = (state) => {
  return state.shopReducer.creation.navigationNextShop;
};
export const shopCreationRestoreValues = (state) =>
  state.shopReducer.creation.restoreFormValues;
