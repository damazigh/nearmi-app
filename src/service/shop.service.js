import { dataURItoBlob, toTime } from '../utils/utils';
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
    shop.shortDescription = generalStep.shopshortDesc;
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
  return shopAxios.post('/api/shop/v1/pro/create', shop);
};

const search = () => {
  const savedAddress = JSON.parse(sessionStorage.getItem('address'));
  const { longitude, latitude } = savedAddress;
  const address = { longitude, latitude };
  return shopAxios.post(`/api/shop/v1/search?limit=${10}`, { address });
};

const usersShop = () => {
  return shopAxios.get('/api/shop/v1/pro/mine');
};

const proShopDetail = (id) => {
  return shopAxios.get(`/api/shop/v1/pro/${id}`);
};

const buildImagePath = (id, name) => {
  return `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/${id}/image/${name}`;
};

const loadConfig = () => {
  return shopAxios.get(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/config`
  );
};

/**
 * add an image to shop
 * @param {*} id shop id
 * @param {*} imgWrapper which contains image as url data and image name
 */
const addImage = (id, imgWrapper) => {
  const formData = new FormData();
  const image = dataURItoBlob(imgWrapper.data);
  formData.append('images', image, imgWrapper.name);
  return shopAxios.put(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/upload/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

/**
 * delete a list of images attached to specific shop
 * @param {*} id shop's id
 * @param {*} images images list
 */
const deleteImages = (id, images) => {
  return shopAxios.put(
    `${process.env.REACT_APP_SHOP_ENDPOINT}/api/shop/v1/pro/delete/${id}?images=${images}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * exported service object
 */
const ShopService = {
  create: create,
  search: search,
  usersShop: usersShop,
  proShopDetail: proShopDetail,
  buildImagePath: buildImagePath,
  loadConfig: loadConfig,
  addImage: addImage,
  deleteImages: deleteImages,
};
export default ShopService;
