import axios from 'axios';
import ZeplyLogger from 'utils/ZeplyLogger';
import { setAlert } from './alert';
import {
  GET_ADDRESS_DATA,
  GET_EUR_RATE,
  GET_TRANSACTION_DATA,
  GET_USD_RATE,
  SEARCH_ADDRESS,
  SEARCH_TRANSACTION,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE
} from './types';
import MyEnvConfig from 'configs/MyEnvConfig';
import GlobalEnv from 'configs/GlobalEnv';
const baseurl = GlobalEnv.isDebug
  ? `${MyEnvConfig.baseurl.dev}/zpapi`
  : `${MyEnvConfig.baseurl.prod}/zpapi`;

export const getUSDRate = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://blockchain.info/tobtc?currency=USD&value=100000'
    );
    dispatch({
      type: GET_USD_RATE,
      payload: res.data
    });
  } catch (error) {
    ZeplyLogger(error);
  }
};

export const getEURRate = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://blockchain.info/tobtc?currency=EUR&value=100000'
    );
    dispatch({
      type: GET_EUR_RATE,
      payload: res.data
    });
  } catch (error) {
    ZeplyLogger(error);
  }
};

export const getTableData = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE
    });
    const addresses = await axios.get(`${baseurl}/btc/address/topsearch`);
    const transactions = await axios.get(
      `${baseurl}/btc/transaction/topsearch`
    );
    dispatch({
      type: GET_ADDRESS_DATA,
      payload: addresses.data.addresses
    });
    dispatch({
      type: GET_TRANSACTION_DATA,
      payload: transactions.data.transactions
    });
    dispatch({
      type: SET_LOADING_FALSE
    });
  } catch (error) {
    setAlert(
      'Invalid Address or Reached to rate limit of blockcypher',
      'error'
    );
    ZeplyLogger(error);
  }
};

export const searchAddress = (address) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE
    });
    const res = await axios.get(`${baseurl}/btc/address/search/${address}`);
    dispatch({
      type: SEARCH_ADDRESS,
      payload: [res.data]
    });
    dispatch({
      type: SET_LOADING_FALSE
    });
  } catch (error) {
    setAlert(
      'Invalid Address or Reached to rate limit of blockcypher',
      'error'
    );
    ZeplyLogger(error);
  }
};

export const searchTransaction = (transaction) => async (dispatch) => {
  try {
    ZeplyLogger(transaction);
    dispatch({
      type: SET_LOADING_TRUE
    });
    const res = await axios.get(
      `${baseurl}/btc/transaction/search/${transaction}`
    );
    dispatch({
      type: SEARCH_TRANSACTION,
      payload: [res.data]
    });
    dispatch({
      type: SET_LOADING_FALSE
    });
  } catch (error) {
    setAlert(
      'Invalid Address or Reached to rate limit of blockcypher',
      'error'
    );
    ZeplyLogger(error);
  }
};

export const subscribe = (hash) => async (dispatch) => {
  try {
    await axios.get(`${baseurl}/btc/subscribe/${hash}`);
    setAlert('Subscribed!', 'success');
    dispatch(getTableData());
    dispatch(searchAddress(hash));
  } catch (error) {
    ZeplyLogger(error);
  }
};

export const unsubscribe = (hash) => async (dispatch) => {
  try {
    await axios.post(`${baseurl}/btc/unsubscribe/${hash}`);
    setAlert('Unsubscribed!', 'success');
    dispatch(getTableData());
    dispatch(searchAddress(hash));
  } catch (error) {
    ZeplyLogger(error);
  }
};
