const express = require('express')
const router = express.Router()
const cookieparser = require("cookie-parser")
const iplCtrls = require('../controllers/iplCtrls')

router.use(express.json())
router.use(cookieparser())

router.get('/ipl-api/schedule', iplCtrls.schedule)
router.post('/ipl-api/match-score',iplCtrls.matchScore)
router.get('/ipl-api/teams-meta-data',iplCtrls.teamMetaData)
router.get('/ipl-api/matchwise-posters',iplCtrls.matchWisePosters)

module.exports = router