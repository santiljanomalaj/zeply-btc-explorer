import Api from '../utils/Api';
import { setAlert } from './alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  VERIFY_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from './types';
import ZeplyLogger from 'utils/ZeplyLogger';

//-- Load User
export const loadUser = (navigate) => async (dispatch) => {
  try {
    const res = await Api.get('/user/uinfo');
    ZeplyLogger(res.data);
    // setAlert(`Welcome ${res.data.firstName}`, 'success');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    if (navigate) {
      localStorage.setItem('fitFor', res?.data?.fitFor);
      navigate(`${res.data.pRoute}`);
    }
  } catch (err) {
    ZeplyLogger('auth/loadUser:', err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//-- Signup User
export const signup = async (formData, navigate) => {
  try {
    const res = await Api.post('/user/signup', formData);
    if (res.data === 'Please verify email that sent to your account') {
      navigate('/verify');
      setAlert(res.data, 'success');
    } else if (res.data === 'Please login to your account') {
      navigate('/login');
      setAlert(res.data, 'success');
    }
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

//-- Verify User
export const verify = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/user/verify', formData);

    dispatch({
      type: VERIFY_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(navigate));
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

//-- Login User
export const login = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/user/login', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(navigate));
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

//-- Forgot Password
export const forgotPwd = async (formData, navigate) => {
  try {
    const res = await Api.post('/user/forgotpwd', formData);
    if (res.data === 'Message with reset token sent to that email') {
      navigate('/reset-pwd');
      setAlert(res.data, 'success');
    } else {
      navigate('/reset-pwd');
      ZeplyLogger('auth/forgotPwd:', res.data);
      setAlert('Reset token is created', 'success');
    }
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

//-- Reset Password
export const resetPwd = async (formData, navigate) => {
  try {
    const res = await Api.post('/user/resetpwd', formData);
    setAlert(res.data, 'success');
    navigate('/login');
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

/**
 * @method POST
 * @route dfnew/user/logindetails/edit
 * @param {*} formData
 * @returns
 */
export const editLoginDetails = (formData) => async (dispatch) => {
  try {
    const res = await Api.post('/user/logindetails/edit', formData);
    if ((res.data = 'Login Details have been updated')) {
      dispatch(loadUser());
      setAlert('Login Details have been updated', 'success');
    }
  } catch (err) {
    ZeplyLogger(err);
    if (err?.response?.status === 422) {
      const errmsgs = err?.response?.data?.errors;
      if (errmsgs) {
        errmsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      }
    }
  }
};

//-- Logout
export const logout = () => ({ type: LOGOUT });
