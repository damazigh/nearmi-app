import {
  HANDLED_NEXT_SHOP_CREATION_STEP,
  NEXT_SHOP_CREATION_STEP,
} from '../type';

export const startedNavigationToNextShopStep = () => {
  return { type: NEXT_SHOP_CREATION_STEP };
};

export const handledNextStep = () => {
  return { type: HANDLED_NEXT_SHOP_CREATION_STEP };
};
