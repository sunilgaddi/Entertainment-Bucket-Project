const express = require('express');
const router = express.Router()
const stripeWebhookCtrls =  require('../controllers/stripeWebhookCtrls')

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookCtrls.stripeWebhook)

module.exports = router