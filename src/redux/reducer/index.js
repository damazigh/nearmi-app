import { combineReducers } from 'redux';
import accountReducer from './account.reducer';
import shopReducer from './shop.reducer';
const rootReducer = combineReducers({ accountReducer, shopReducer });
export default rootReducer;
