import Api from './Api';
import MyEnvConfig from 'configs/MyEnvConfig';
import ZeplyLogger from './ZeplyLogger';

//-- store our JWT in LS and set axios headers if we do have a token
const SetAuthToken = (token) => {
  try {
    if (token) {
      Api.defaults.headers.common[
        'zeply-auth-token'
      ] = `${MyEnvConfig.bearer.tokenPrefix} ${token}`;
      localStorage.setItem('zptoken', token);
    } else {
      delete Api.defaults.headers.common['zeply-auth-token'];
      localStorage.removeItem('zptoken');
    }
  } catch (e) {
    ZeplyLogger(e);
  }
};

export default SetAuthToken;
