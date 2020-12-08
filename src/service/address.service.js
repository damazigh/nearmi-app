import { addrAxios } from './axios-http.service';

const AddressService = {
  /**
   * @param text
   * attempt to get addresses from user's input
   */
  searchLocalisation: (text) => {
    const q = text.split(' ').join('+');
    return addrAxios.get(`/search?q=${q}&limit=5`);
  },
  searchReverseLocalisation: (longitude, latitude) => {
    return addrAxios.get(`/reverse?lon=${longitude}&lat=${latitude}`);
  },
};

export default AddressService;
