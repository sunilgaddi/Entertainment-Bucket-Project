const axios = require('axios')
const CircularJSON = require('circular-json')
const circularjson = require('circular-json')

const API_KEY = 'd8e917f824c891e475632f1dfa0de591'

const url = 'https://api.themoviedb.org/3'

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

const moviesCtrls = {
  movies: async (req, res) => {
 
    try{

      const trendingRes = await axios.get(`${url}${requests.fetchTrending}`)
      const netFlixOriginalsRes = await axios.get(`${url}${requests.fetchNetflixOriginals}`)
      const topRatedRes = await axios.get(`${url}${requests.fetchTopRated}`)
      const actionMoviesRes = await axios.get(`${url}${requests.fetchActionMovies}`)
      const comedyRes = await axios.get(`${url}${requests.fetchComedyMovies}`)
      const horrorRes = await axios.get(`${url}${requests.fetchHorrorMovies}`)
      const romanceRes = await axios.get(`${url}${requests.fetchRomanceMovies}`)
      const documentariesRes = await axios.get(`${url}${requests.fetchDocumentaries}`)
      
      let allMovies = CircularJSON.stringify([ trendingRes,netFlixOriginalsRes,topRatedRes,actionMoviesRes,comedyRes,horrorRes,romanceRes, documentariesRes])

      allMovies = JSON.parse(allMovies)
      
      res.status(200).json(allMovies)
    }
    catch (err){
      console.log(err)
    }

  }
  
}

module.exports = moviesCtrls