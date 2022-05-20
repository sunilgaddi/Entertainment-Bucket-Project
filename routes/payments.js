const express = require('express')
const router = express.Router()
const cookieparser = require("cookie-parser")
const paymentCtrls = require("../controllers/paymentCtrls")

router.use(express.json())
router.use(cookieparser())

router.post('/create-checkout-session',paymentCtrls.checkoutSession)

module.exports = router