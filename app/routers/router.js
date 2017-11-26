var express = require('express');
var router = express.Router();

var demo = require('./../controllers/demo.controller');

/**
 * GET API
 */

// ...


/**
 * POST API
 */

router.post('/recover-balance', demo.recoverBalance);
router.post('/get-status-of-pol', demo.getStatusOfPoL);
router.post('/get-pol', demo.getPoL);
router.post('/get-balance', demo.getBalance);
router.post('/reject-pol', demo.rejectPoL);
router.post('/send-the-tx', demo.sendTheTx);

module.exports = router;