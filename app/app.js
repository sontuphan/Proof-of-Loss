var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

/**
 * Contructors
 */
var app = express();
var config = require('./configs/config');
var PoL = artifacts.require('PoL');
var accounts = web3.eth.accounts;
var coinbase = accounts[0];

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Global variables
 */
global.PoL = PoL;
global.web3 = web3;
global.config = config;
global.accounts = accounts;
global.coinbase = coinbase;

/**
 * Routers
 */
var router = require('./routers/router');
app.use('/', router);

/**
 * Initialize server
 */
app.listen(config.server.port, function () {
    console.log('Server is listening on port ' + config.server.port);
});

module.exports = function (deployed) { }