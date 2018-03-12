const MAIN_NET_ENDPOINT = 'https://api.kapunode.net'; //'http://51.15.198.173:4600';
const MAIN_NET_NETHASH = '313ea34c8eb705f79e7bc298b788417ff3f7116c9596f5c9875e769ee2f4ede1';
const DEV_NET_ENDPOINT = 'https://dev.api.kapunode.net';//'http://51.15.67.153:4100'
const DEV_NET_NETHASH = 'f1ef11be7a879671b3019a785c9a2c9dbd9d800b05644d26ad132275ffe2dd48';
const GET_NET_HASH_ENDPOINT = '/api/blocks/getNetHash';
const TRANSACTIONS_ENDPOINT = '/peer/transactions';
const HEADER_CONTENT_TYPE = 'application/json';
const HEADER_OS = 'kapu-pool';
const HEADER_PORT = 4100;
const HEADER_VERSION = require('./package.json').version;
const PRECISION = 8;
const MESSAGE_1 = 'pool sharing: thank You for your vote';
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