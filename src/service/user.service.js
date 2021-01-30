import { userAxios } from './axios-http.service';

const loadProfile = () => {
  return userAxios.get('/api/user/v1/profile/load');
};

const UserService = {
  loadProfile: loadProfile,
};
export default UserService;
