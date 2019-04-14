const MAIN_NET_ENDPOINT = 'https://api.kapunode.net'; //'http://51.15.198.173:4600';
const MAIN_NET_NETHASH = 'a28cfbd5475471d9c23186976b17a482138de2c6edfc7daf0919a159d2c524e6';
const DEV_NET_ENDPOINT = 'https://dev.api.kapunode.net';//'http://51.15.67.153:4100'
const DEV_NET_NETHASH = '';
const GET_NET_HASH_ENDPOINT = '/api/blocks/getNethash';
const TRANSACTIONS_ENDPOINT = '/api/v2/transactions';
const HEADER_CONTENT_TYPE = 'application/json';
const HEADER_OS = 'kapu-pool';
const HEADER_PORT = 9702;
const HEADER_VERSION = '2.0.17'; //require('./package.json').version;
const PRECISION = 8;
const MESSAGE_1 = 'pool sharing - 90%: www.cryptdelegate.com';
const MESSAGE_2 = 'pool sharing: KCH';

module.exports = {
    MAIN_NET_ENDPOINT: MAIN_NET_ENDPOINT,
    MAIN_NET_NETHASH: MAIN_NET_NETHASH,
    DEV_NET_ENDPOINT: DEV_NET_ENDPOINT,
    DEV_NET_NETHASH: DEV_NET_NETHASH,
    GET_NET_HASH_ENDPOINT: GET_NET_HASH_ENDPOINT,
    TRANSACTIONS_ENDPOINT: TRANSACTIONS_ENDPOINT,
    HEADER_CONTENT_TYPE: HEADER_CONTENT_TYPE,
    HEADER_OS: HEADER_OS,
    HEADER_PORT: HEADER_PORT,
    HEADER_VERSION: HEADER_VERSION,
    PRECISION: PRECISION,
    MESSAGE_1: MESSAGE_1,
    MESSAGE_2: MESSAGE_2,
    roundDown: function (number, decimals) {
        decimals = decimals || 0;
        return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }
};