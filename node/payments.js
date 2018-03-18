var kapu = require('kapujs');
var request = require('request');
var phassphrases = require('./passphrases');
var constants = require('./constants');
var payments = require('./paymentsMainNET2');
var logger = require('winston');
logger.level = 'info';

const ENDPOINT = constants.DEV_NET_ENDPOINT;//constants.MAIN_NET_ENDPOINT;//
const SEND = true;

var callback = function (error, response, body) {
    if (error)
        logger.error(error);
    else
        logger.info(body);
};
var nethashExpected = constants.MAIN_NET_NETHASH;
var passphrase = phassphrases.PASSPHRASE_MAINNET;
var secondPassphrase = phassphrases.SECOND_PASSPHRASE_MAINNET;
if (ENDPOINT === constants.DEV_NET_ENDPOINT) {
    payments = require('./paymentsDevNET');
    kapu.crypto.setNetworkVersion(kapu.networks.devnet.pubKeyHash);
    nethashExpected = constants.DEV_NET_NETHASH;
    passphrase = phassphrases.PASSPHRASE_DEVNET;
    secondPassphrase = phassphrases.SECOND_PASSPHRASE_DEVNET;
}
logger.info('API endpoint: %s', ENDPOINT);
if (payments !== null) {
    logger.debug('Payments array: %s', JSON.stringify(payments));
    var nethash;
    request({
        url: ENDPOINT + constants.GET_NET_HASH_ENDPOINT,
        json: true,
        method: 'GET',
        headers: {
            'Content-Type': constants.HEADER_CONTENT_TYPE,
            'os': constants.HEADER_OS,
            'version': constants.HEADER_VERSION,
            'port': constants.HEADER_PORT,
            'nethash': 'wrong-nethash'
        }
    }, function (error, response, body) {
        nethash = body.nethash;
        logger.debug('NetHash: ' + nethash);
        logger.debug('NetHash Expected: ' + nethashExpected);
        if (nethash === nethashExpected) {
            /*
                Cycle through payments
            */
            var transactionsObject = payments.transactions;
            //logger.debug("Transactions: " + JSON.stringify(transactionsObject));
            var donationsObject = payments.donations;
            //logger.debug("Donations: " + JSON.stringify(donationsObject));
            var transactionsRequest = {};
            var transactionsRequestKey = 'transactions';
            transactionsRequest[transactionsRequestKey] = [];
            for (var key in transactionsObject) {
                if (transactionsObject[key].destination && transactionsObject[key].amount) {
                    //logger.debug("Key: %s Value: %s %s", key, transactionsObject[key].destination, transactionsObject[key].amount);
                    //var amount = (transactionsObject[key].amount).toFixed(constants.PRECISION) * Math.pow(10, 8); // 100000000000
                    var amount = constants.roundDown(transactionsObject[key].amount, constants.PRECISION) * Math.pow(10, 8);
                    var transaction = kapu.transaction.createTransaction(transactionsObject[key].destination, amount, constants.MESSAGE_1, passphrase, secondPassphrase);
                    //logger.debug(transaction);
                    transactionsRequest[transactionsRequestKey].push(transaction);
                }
            }
            for (var key in donationsObject) {
                if (donationsObject[key].destination && donationsObject[key].amount) {
                    //logger.debug("Key: %s Value: %s %s", key, donationsObject[key].destination, donationsObject[key].amount);
                    //var amount = (donationsObject[key].amount).toFixed(constants.PRECISION) * Math.pow(10, 8); // 100000000000
                    var amount = constants.roundDown(donationsObject[key].amount, constants.PRECISION) * Math.pow(10, 8);
                    var transaction = kapu.transaction.createTransaction(donationsObject[key].destination, amount, constants.MESSAGE_2, passphrase, secondPassphrase);
                    //logger.debug(transaction);
                    transactionsRequest[transactionsRequestKey].push(transaction);
                }
            }
            logger.debug(JSON.stringify(transactionsRequest));
            //logger.debug({ transactions: [transaction] });
            /*
                Send transaction
            */
            if (SEND) {
                request({
                    url: ENDPOINT + constants.TRANSACTIONS_ENDPOINT,
                    json: transactionsRequest,
                    //json: { transactions: [transaction] },
                    method: 'POST',
                    headers: {
                        'Content-Type': constants.HEADER_CONTENT_TYPE,
                        'os': constants.HEADER_OS,
                        'version': constants.HEADER_VERSION,
                        'port': constants.HEADER_PORT,
                        'nethash': nethash
                    }
                }, callback);
            } else {
                logger.debug("Transactions not sent");
            }
        } else {
            logger.error("ERROR: nethash is wrong");
        }
    });
} else {
    logger.error("ERROR: payments file is empty");
}