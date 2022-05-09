import { useEffect, useState } from 'react'
import axios from 'axios'
import './MoviesList.css'
import {movieRequests} from '../../../EndPoints'
import Banner from '../Banner/Banner'
import MoviesRow from '../movieRows/MoviesRow'

function MoviesList() {
  const [allMovies, setAllMovies] = useState()
  const [banner, setBanner] = useState("")
  const [cast, setCast] = useState("")
  const [genre, setGenre] = useState("")
  const [topRated, setTopRated] = useState("")
  const [actionMovies, setActionMovies] = useState("")
  const [romanceMovies, setRomanceMovies] = useState("")
  const [horrorMovies, setHorrorMovies] = useState("")
  const [documentriesMovies, setDocumentriesMovies] = useState("")
  const [comedyMovies, setComedyMovies] = useState("")

  useEffect(() => {
    const fectMovieData = async () => {
      try {
        const movieData =  await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
        setBanner(movieData.data.results[Math.floor( Math.random() * movieData.data.results.length-1)])
      } catch (err) {
        console.log(err.message)
      }
    }
    fectMovieData()
  }, [])


  useEffect(() => {
    if(banner){
      const fetchMovieCast = async () => {
        const movie_id = banner.id
        const genre_id = banner.genre_ids[0]
        const movieCast = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
        setCast([movieCast.data.cast[0],movieCast.data.cast[1]])
        
        const movieGeneris = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US')

         let genreId;

         movieGeneris.data.genres.filter( (item) => {
           if(item.id == genre_id){
             return genreId = item
           }
         })
         
         setGenre(genreId)
      }
      fetchMovieCast()
    }
  },[banner])

  useEffect( () => {
     const fetchAllGenreMovies = async () => {
      const fetchTopRated = await axios.get(movieRequests.fetchTopRated)
      setTopRated(fetchTopRated.data.results)
      const fetchActionMovies =await axios.get(movieRequests.fetchActionMovies)
      setActionMovies(fetchActionMovies.data.results)
      const fetchComedyMovies = await axios.get(movieRequests.fetchComedyMovies)
      setComedyMovies(fetchComedyMovies.data.results)
      const fetchHorrorMovies = await axios.get(movieRequests.fetchHorrorMovies)
      setHorrorMovies(fetchHorrorMovies.data.results)
      const fetchRomanceMovies = await axios.get(movieRequests.fetchRomanceMovies)
      setRomanceMovies(fetchRomanceMovies.data.results)
      const fetchDocumentaries = await axios.get(movieRequests.fetchDocumentaries)
      setDocumentriesMovies(fetchDocumentaries.data.results)
     }
     fetchAllGenreMovies()
  },[])

  return (
    <div className='movie__list'>
          <Banner banner={banner} cast={cast} genreis={genre}/>
          <MoviesRow data={topRated} title={"Top Rated"} mainPanel={'movie'}/>
          <MoviesRow data={actionMovies} title={"Action"} mainPanel={'movie'}/>
          <MoviesRow data={horrorMovies} title={"Horror"} mainPanel={'movie'}/>
          <MoviesRow data={comedyMovies} title={"Comedy"} mainPanel={'movie'}/>
          <MoviesRow data={romanceMovies} title={"Romance"} mainPanel={'movie'}/>
          <MoviesRow data={documentriesMovies} title={"Documentry"} mainPanel={'movie'}/>
    </div>
  )
}

export default MoviesList