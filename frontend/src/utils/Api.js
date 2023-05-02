import axios from 'axios';

import store from '../store';
import { LOGOUT } from '../actions/types';
import GlobalEnv from 'configs/GlobalEnv';
import MyEnvConfig from 'configs/MyEnvConfig';
import ZeplyLogger from './ZeplyLogger';

const baseurl = GlobalEnv.isDebug
  ? `${MyEnvConfig.baseurl.dev}/zpapi`
  : `${MyEnvConfig.baseurl.prod}/zpapi`;

const Api = axios.create({
  baseURL: baseurl,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * NOTE: intercept any error responses from the api
 * and check if the token is no longer valid.
 * i.e., Token has expired or user is no longer authenticated.
 * logout the user if the token has expired
 */
Api.interceptors.response.use(
  (res) => res,
  (err) => {
    ZeplyLogger('Api/interceptors:', err);
    if (err?.response?.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default Api;
