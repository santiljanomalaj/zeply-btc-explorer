/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import express from 'express';

import * as btcCtrl from '../controllers/btcCtrl.js';

const router = express.Router();

/**
 * @method GET
 * @route zpapi/btc/subscribe/:hash
 * @access public
 * @desc Listen for incoming subscription requests at the endpoint
 */
router.get('/subscribe/:hash', btcCtrl.subscribeHandler);

/**
 * @method POST
 * @route zpapi/btc/unsubscribe/:hash
 * @access public
 * @desc Unsubscribe the notification to the changes of transaction in a given address
 */
router.post('/unsubscribe/:hash', btcCtrl.unsubscribeHandler);

/**
 * @method POST
 * @route zpapi/btc/notification/:hash
 * @access public
 * @desc Notify transaction hash to all connected clients
 */
router.post('/notification/:hash', btcCtrl.notificationHandler);

/**
 * @method GET
 * @route zpapi/btc/address/search/:hash
 * @access public
 * @desc Search bitcoin address and get information about that if exist
 */
router.get('/address/search/:hash', btcCtrl.searchAddressHandler);

/**
 * @method GET
 * @route zpapi/btc/transaction/search/:hash
 * @access public
 * @desc Search bitcoin transaction and get information about that if exist
 */
router.get('/transaction/search/:hash', btcCtrl.searchTransactionHandler);

/**
 * @method GET
 * @route zpapi/btc/address/topsearch
 * @access public
 * @desc get top searched addresses
 */
router.get('/address/topsearch', btcCtrl.getTopSearchedAddressHandler);

/**
 * @method GET
 * @route zpapi/btc/transaction/topsearch
 * @access public
 * @desc get top_searched transactions
 */
router.get('/transaction/topsearch', btcCtrl.getTopSearchedTransactionHandler);

export default router;
