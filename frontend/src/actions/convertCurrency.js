import BigNumber from 'bignumber.js';

import ZeplyLogger from 'utils/ZeplyLogger';

const BIG_TEN_8 = new BigNumber(100000000);
const BIG_TEN_5 = new BigNumber(100000);

export const convertBTC = (satoshis) => {
  try {
    const amount = new BigNumber(satoshis);
    return amount.dividedBy(BIG_TEN_8).toString();
  } catch (e) {
    ZeplyLogger(e);
    return '';
  }
};

export const convertUSD = (satoshis, rate_100000usd_btc) => {
  try {
    const amount = new BigNumber(satoshis);
    const rate = new BigNumber(rate_100000usd_btc);
    return amount
      .dividedBy(BIG_TEN_8)
      .multipliedBy(BIG_TEN_5)
      .dividedBy(rate)
      .toString();
  } catch (e) {
    ZeplyLogger(e);
    return '';
  }
};

export const convertEUR = (satoshis, rate_100000eur_btc) => {
  try {
    const amount = new BigNumber(satoshis);
    const rate = new BigNumber(rate_100000eur_btc);
    return amount
      .dividedBy(BIG_TEN_8)
      .multipliedBy(BIG_TEN_5)
      .dividedBy(rate)
      .toString();
  } catch (e) {
    ZeplyLogger(e);
    return '';
  }
};
