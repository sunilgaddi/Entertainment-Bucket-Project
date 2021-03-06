const express = require('express')
const router = express.Router()
const cookieparser = require("cookie-parser")
const gamingCtrls = require('../controllers/gamingCtrls')

router.use(express.json())
router.use(cookieparser())

router.get('/bgmi',gamingCtrls.bgmi)
router.get('/valorant',gamingCtrls.valorant)
router.post('/gameDetails',gamingCtrls.gameDetails)

module.exports = router