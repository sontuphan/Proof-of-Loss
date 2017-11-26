var Web3 = require('web3');
var provider = 'http://localhost:8545';

var web3 = new Web3(new Web3.providers.HttpProvider(provider));

var accounts = web3.eth.accounts;
var coinbase = accounts[0];
var user = accounts[1];

var balance = web3.eth.getBalance('0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c');
console.log(balance)

var blockNumber = web3.eth.blockNumber;
console.log(blockNumber)