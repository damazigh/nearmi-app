import {
  RESTORE_FORM_VALUE_COMPLETED,
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
  RESTORE_FORM_VALUE,
} from '../type';

export const startedNavigationToNextShopStep = () => {
  return { type: NEXT_SHOP_CREATION_STEP };
};

export const handledNextStep = () => {
  return { type: HANDLED_NEXT_SHOP_CREATION_STEP };
};
export const restoreFormValues = () => {
  return { type: RESTORE_FORM_VALUE };
};
export const formValuesRestored = () => {
  return { type: RESTORE_FORM_VALUE_COMPLETED };
};
