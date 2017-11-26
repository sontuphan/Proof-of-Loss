var ERROR = 'Error';

var PoL = global.PoL;

var Demo = {

    /**
     * Candidate yourself when losing private key
     * @func recoverBalance
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    recoverBalance: function (req, res) {
        var owner = req.body.owner;

        if (!owner) {
            return res.send({ state: 'error', error: ERROR });
        }

        PoL.deployed().then(function (instance) {
            var _pol = instance;
            return _pol.recoverBalance(
                global.coinbase,
                { from: global.accounts[1], value: web3.toWei(1, 'ether') }
            );
        }).then(function (re) {
            console.log('Transaction successful:', re);
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log('Error:', er);
            return res.send({ state: 'error', error: ERROR });
        });
    },

    /**
     * Reject PoL if private key is not lost
     * @func rejectPoL
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    rejectPoL: function (req, res) {
        PoL.deployed().then(function (instance) {
            var _pol = instance;
            return _pol.rejectPoL({ from: global.coinbase });
        }).then(function (re) {
            console.log('Transaction successful:', re);
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log('Error:', er);
            return res.send({ state: 'error', error: ERROR });
        });
    },

    /**
     * Check status of PoL and increase nonce as a trick
     * @func getStatusOfPoL
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    getStatusOfPoL: function (req, res) {
        var owner = req.body.owner;

        if (!owner) {
            return res.send({ state: 'error', error: ERROR });
        }

        PoL.deployed().then(function (instance) {
            var _pol = instance;
            return _pol.isValidPoL(
                global.coinbase,
                { from: global.coinbase }
            );
        }).then(function (re) {
            console.log('Transaction successful:', re);
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log('Error:', er);
            return res.send({ state: 'error', error: ERROR });
        });
    },

    /**
     * Simulate sending the tx of holder
     * @func sendTheTx
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    sendTheTx: function (req, res) {
        var owner = req.body.owner;

        if (!owner) {
            return res.send({ state: 'error', error: ERROR });
        }

        web3.eth.sendTransaction(
            { from: global.coinbase, to: owner, value: web3.toWei(10, 'ether') },
            function (er, re) {
                if (er) {
                    console.log('Error:', er);
                    return res.send({ state: 'error', error: ERROR });
                }

                console.log('Transaction successful:', re);
                return res.send({ state: 'success', data: re });
            });
    },

    /**
     * Get PoL
     * @func getPoL
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    getPoL: function (req, res) {
        var owner = req.body.owner;

        if (!owner) {
            return res.send({ state: 'error', error: ERROR });
        }

        PoL.deployed().then(function (instance) {
            var _pol = instance;
            return _pol.getPoL(
                global.coinbase,
                { from: global.coinbase }
            );
        }).then(function (re) {
            console.log('Transaction successful:', re);
            return res.send({ state: 'success', data: re });
        }).catch(function (er) {
            console.log('Error:', er);
            return res.send({ state: 'error', error: ERROR });
        });
    },

    /**
     * Get Balance
     * @func getBalance
     * @param {object} req - request
     * @param {object} res - in case of error, res return 404 error
     */
    getBalance: function (req, res) {
        var owner = req.body.owner;

        if (!owner) {
            return res.send({ state: 'error', error: ERROR });
        }

        var balance = web3.eth.getBalance(owner);
        var re = web3.fromWei(balance, 'ether');
        console.log('Transaction successful:', re);
        return res.send({ state: 'success', data: re });
    }
}

module.exports = Demo;