const router = require('express').Router()
const moviesCtrls = require('../controllers/moviesCtrls')


router.get('/home/movies', moviesCtrls.fetchNetflixOriginals)
router.post('/movie/cast',moviesCtrls.fetchMovieCast)

module.exports = router