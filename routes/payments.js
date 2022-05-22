const express = require('express')
const router = express.Router()
const cookieparser = require("cookie-parser")
const paymentCtrls = require("../controllers/paymentCtrls")
const auth = require('../middleware/auth')

router.use(express.json())
router.use(cookieparser())

router.post('/create-checkout-session',paymentCtrls.checkoutSession)
router.get('/get-subscription-details', auth, paymentCtrls.subscriptionDetails)

module.exports = router