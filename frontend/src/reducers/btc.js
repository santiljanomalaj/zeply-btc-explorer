import {
  GET_ADDRESS_DATA,
  GET_EUR_RATE,
  GET_TRANSACTION_DATA,
  GET_USD_RATE,
  SEARCH_ADDRESS,
  SEARCH_TRANSACTION,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE
} from '../actions/types';
import ZeplyLogger from 'utils/ZeplyLogger';

const initialState = {
  gAddress: [],
  sAddress: [],
  gTransaction: [],
  sTransaction: [],
  eurRate: null,
  usdRate: null,
  loading: false
};

function btcReducer(state = initialState, action) {
  const { type, payload } = action;
  ZeplyLogger('logout___', type);
  switch (type) {
    case GET_ADDRESS_DATA:
      return {
        ...state,
        gAddress: payload
      };
    case GET_TRANSACTION_DATA:
      return {
        ...state,
        gTransaction: payload
      };
    case GET_EUR_RATE:
      return {
        ...state,
        eurRate: payload
      };
    case GET_USD_RATE:
      return {
        ...state,
        usdRate: payload
      };
    case SEARCH_ADDRESS:
      return {
        ...state,
        sAddress: payload
      };
    case SEARCH_TRANSACTION:
      return {
        ...state,
        sTransaction: payload
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default btcReducer;
