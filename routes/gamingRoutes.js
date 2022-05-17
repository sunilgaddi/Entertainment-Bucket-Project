const router = require('express').Router()
const gamingCtrls = require('../controllers/gamingCtrls')

router.get('/bgmi',gamingCtrls.bgmi)
router.get('/valorant',gamingCtrls.valorant)
router.post('/gameDetails',gamingCtrls.gameDetails)

module.exports = router