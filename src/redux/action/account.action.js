import { ANONYMOUS, LNG_CHANGE, USER_AUTHENTICATED } from '../type';

export const languageChanges = (lng) => ({ type: LNG_CHANGE, lng: lng });
export const userAuthenticated = (user) => ({
  type: USER_AUTHENTICATED,
  user: user,
});
export const anonymous = () => ({
  type: ANONYMOUS,
});
