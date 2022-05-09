const router = require('express').Router()
const moviesCtrls = require('../controllers/moviesCtrls')


router.get('/ipl-api/schedule-completed-matches', moviesCtrls.fetchNetflixOriginals)
router.get('/ipl-api/schedule-upcoming-matches',moviesCtrls.fetchMovieCast)
router.get('/ipl-api/teams-meta-data',)

module.exports = router