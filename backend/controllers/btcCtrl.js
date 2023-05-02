/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import asyncHandler from 'express-async-handler';
import axios from 'axios';

import Address from '../models/addressModel.js';
import Transaction from '../models/transactionModel.js';
import { io } from '../server.js';

const subscribeHandler = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.params;
    console.log('API_subscribeHandler:', `Hash is ${hash}`);
    const address = await Address.findOne({
      btcaddress: hash
    });
    if (address) {
      if (!address.isSubscribed) {
        const apiKey = process.env.BC_API_KEY;
        const API_URL = `https://api.blockcypher.com/v1/btc/main/hooks?token=${apiKey}`;

        const subscription = await axios.post(API_URL, {
          event: 'tx-confirmation',
          address: hash,
          url: `http://${process.env.SERVER_IP}:${process.env.PORT}/zpapi/btc/notification/${hash}`
        });

        address.isSubscribed = true;
        address.notificationHookId = subscription.data.id;
        address.save();
        res.json({ result: 'OK', notificationHookId: subscription.data.id });
      } else
        res.json({
          result: 'OK',
          notificationHookId: address.notificationHookId
        });
    } else {
      console.log('this address is not saved in DB');
      res.status(400).json({ message: 'This address is not saved in DB' });
    }
  } catch (e) {
    console.log('API_subscribeHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const unsubscribeHandler = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.params;
    const address = await Address.findOne({
      btcaddress: hash
    });
    if (address) {
      if (address.isSubscribed) {
        const API_URL = `https://api.blockcypher.com/v1/btc/main/hooks/${address.notificationHookId}?token=${process.env.BC_API_KEY}`;
        const result_axios = await axios.delete(API_URL);
        address.isSubscribed = false;
        address.notificationHookId = '';
        address.save();
        res.json({ result: 'OK' });
      } else res.json({ result: 'OK', message: 'already unsubscribed' });
    } else {
      console.log('this address is not saved in DB');
      res.status(400).json({ message: 'This address is not saved in DB' });
    }
  } catch (e) {
    console.log('API_unsubscribeHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const notificationHandler = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.params;
    const txHash = req.body?.hash;
    const confirmations = req.body?.confirmations;
    console.log(
      'API_notificationHandler:',
      `Transaction ${txHash} of ${hash} confirmed ${confirmations}!`
    );

    io.emit('transaction-confirmed', { hash, txHash, confirmations });

    res.status(200).end();
  } catch (e) {
    console.log('API_notificationHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const searchAddressHandler = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.params;
    const info_address = await getInfoAddress(hash);

    if (!info_address)
      res.status(400).json({
        message:
          'Bitcoin Address is invalid or Reaches to Rate Limit of BlockCypher'
      });

    let numberSearch = 1;
    let isSubscribed = false;
    let notificationHookId = '';

    const address = await Address.findOne({
      btcaddress: hash
    });
    if (!address) {
      //-- create one address document
      const new_address = await Address.create({
        btcaddress: hash,
        isSubscribed: false,
        numberSearch: 1,
        notificationHookId: ''
      });
      if (new_address) {
        //-- okay
        console.log('New address document is created');
      } else {
        //-- ignore error
        console.log(
          'Save_Address_ERROR:',
          'Oops, failed to create new address document'
        );
      }
    } else {
      //-- increase the number of Search
      address.numberSearch++;
      numberSearch = address.numberSearch;
      isSubscribed = address.isSubscribed;
      notificationHookId = address.notificationHookId;
      await address.save();
      console.log('The number of search increased');
    }
    const info_address_send = info_address;
    info_address_send['numberSearch'] = numberSearch;
    info_address_send['isSubscribed'] = isSubscribed;
    info_address_send['notificationHookId'] = notificationHookId;
    res.json(info_address_send);
    res.status(200).end();
  } catch (e) {
    console.log('API_searchAddressHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const searchTransactionHandler = asyncHandler(async (req, res) => {
  try {
    const { hash } = req.params;
    const info_transaction = await getInfoTransaction(hash);

    if (!info_transaction)
      res.status(400).json({
        message:
          'Bitcoin Transaction Hash is invalid or Reaches to Rate Limit of blockcypher'
      });

    let numberSearch = 1;

    const transaction = await Transaction.findOne({
      hash: hash
    });
    if (!transaction) {
      //-- create one address document
      const new_transaction = await Transaction.create({
        hash: hash,
        numberSearch: 1
      });
      if (new_transaction) {
        //-- okay
        console.log('New transaction document is created');
      } else {
        //-- ignore error
        console.log(
          'Save_Transaction_ERROR:',
          'Oops, failed to create new transaction document'
        );
      }
    } else {
      //-- increase the number of Search
      transaction.numberSearch++;
      numberSearch = transaction.numberSearch;
      await transaction.save();
      console.log('The number of search increased');
    }
    const info_transaction_send = info_transaction;
    info_transaction_send['numberSearch'] = numberSearch;
    res.json(info_transaction_send);
    res.status(200).end();
  } catch (e) {
    console.log('API_searchTransactionHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getTopSearchedAddressHandler = asyncHandler(async (req, res) => {
  try {
    const addresses = await Address.find().sort({ numberSearch: -1 });
    const addresses_send =
      addresses.length > 5 ? addresses.slice(0, 5) : addresses;
    const addresses_send_data = [];

    async function fillArrayToSend(element) {
      const item = await getInfoAddress(element.btcaddress);

      if (item) {
        item['numberSearch'] = element.numberSearch;
        item['isSubscribed'] = element.isSubscribed;
        item['notificationHookId'] = element.notificationHookId;
        addresses_send_data.push(item);
      }
    }

    for (let element of addresses_send) {
      await fillArrayToSend(element);
    }
    res.json({ addresses: addresses_send_data });
  } catch (e) {
    console.log('getTopSearchedAddressHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getTopSearchedTransactionHandler = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ numberSearch: -1 });
    const transactions_send =
      transactions.length > 5 ? transactions.slice(0, 5) : transactions;
    const transactions_send_data = [];

    async function fillArrayToSend(element) {
      const item = await getInfoTransaction(element.hash);

      if (item) {
        item['numberSearch'] = element.numberSearch;
        transactions_send_data.push(item);
      }
    }

    for (let element of transactions_send) {
      await fillArrayToSend(element);
    }
    res.json({ transactions: transactions_send_data });
  } catch (e) {
    console.log('getTopSearchedTransactionHandler_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

async function getInfoAddress(address) {
  const API_URL = `https://api.blockcypher.com/v1/btc/main/addrs/${address}`;
  try {
    const info_address = await axios.get(API_URL);
    const result = {
      address: address,
      confirmed_txs: info_address.data.n_tx,
      total_received: info_address.data.total_received,
      total_spent: info_address.data.total_sent,
      total_unspent: info_address.data.unconfirmed_balance,
      current_balance: info_address.data.final_balance
    };

    return result;
  } catch (e) {
    console.log('Get_Information_Address_Error', e);
    return null;
  }
}

async function getInfoTransaction(hash) {
  try {
    const API_URL = `https://api.blockcypher.com/v1/btc/main/txs/${hash}`;
    const info_transaction = await axios.get(API_URL);
    let status =
      info_transaction.data.confirmations > 0 ? 'Success' : 'Pending'; //recover
    const result = {
      hash: hash,
      received_time: info_transaction.data.received,
      status: status,
      size: info_transaction.data.size,
      confirmations: info_transaction.data.confirmations,
      total_in: info_transaction.data.vin_sz,
      total_out: info_transaction.data.vout_sz,
      total_fees: info_transaction.data.fees
    };

    return result;
  } catch (e) {
    console.log('Get_Information_Transaction_Error', e);
    return null;
  }
}

export {
  subscribeHandler,
  notificationHandler,
  searchAddressHandler,
  unsubscribeHandler,
  searchTransactionHandler,
  getTopSearchedAddressHandler,
  getTopSearchedTransactionHandler
};
