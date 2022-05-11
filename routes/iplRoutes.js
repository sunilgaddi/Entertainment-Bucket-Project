const router = require('express').Router()
const iplCtrls = require('../controllers/iplCtrls')


router.get('/ipl-api/schedule', iplCtrls.schedule)
router.post('/ipl-api/match-score',iplCtrls.matchScore)
router.get('/ipl-api/teams-meta-data',iplCtrls.teamMetaData)
router.get('/ipl-api/matchwise-posters',iplCtrls.matchWisePosters)

module.exports = router