const router = require('express').Router()
const moviesCtrls = require('../controllers/moviesCtrls')


router.get('/ipl-api/schedule-completed-matches', moviesCtrls.fetchNetflixOriginals)
router.post('/movie/cast',moviesCtrls.fetchMovieCast)

module.exports = router