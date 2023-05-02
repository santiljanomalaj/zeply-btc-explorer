import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import customization from './customization';
import btc from './btc';

export default combineReducers({
  alert,
  auth,
  customization,
  btc
});
