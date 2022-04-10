const router = require('express').Router()
const moviesCtrls = require('../controllers/moviesCtrls')


router.get('/home/movies', moviesCtrls.movies)

module.exports = router