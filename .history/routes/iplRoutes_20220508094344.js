const router = require('express').Router()
const iplCtrls = require('../controllers/iplCtrls')


router.get('/ipl-api/schedule-completed-matches', iplCtrls.completedMatches)
router.get('/ipl-api/schedule-upcoming-matches',iplCtrls.upcomingMatches)
router.get('/ipl-api/teams-meta-data',iplCtrls)
router.get('/ipl-api/matchwise-posters')

module.exports = router