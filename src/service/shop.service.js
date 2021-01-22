import { toTime } from '../utils/utils';
import { shopAxios } from './axios-http.service';
/**
 * method that handles creation of new shop
 */
const create = () => {
  const shop = {};
  // fill general step properties
  const generalStep = JSON.parse(sessionStorage.getItem('step_0'));
  if (generalStep) {
    shop.name = generalStep.shopName;
    shop.description = generalStep.shopLongDesc;
    shop.shortDesc = generalStep.shopLongDesc;
    shop.registrationNumber = generalStep.shopRegNum;
  }
  // fill settings step properties
  const settingStep = JSON.parse(sessionStorage.getItem('step_1'));
  if (settingStep) {
    shop.opensAt = toTime(settingStep.opensAt);
    shop.closesAt = toTime(settingStep.closesAt);
    shop.schedulingAppointment = settingStep.schedulingAppointement;
    shop.automaticOrderConfirmation = settingStep.automaticOrderConfirmation;
    shop.withoutBreakClosure = settingStep.lunchClosure;
    if (settingStep.lunchClosure) {
      shop.breakClosureStart = toTime(settingStep.lunchClosesAt);
      shop.breakClosureEnd = toTime(settingStep.lunchReopensAt);
    }
  }
  const address = JSON.parse(sessionStorage.getItem('step_2')); // address
  shop.address = address;
  return shopAxios.post('/api/shop/v1/create', shop);
};

const ShopService = {
  create: create,
};
export default ShopService;
