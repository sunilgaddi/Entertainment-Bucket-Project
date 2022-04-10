import {useEffect, useState} from 'react'
import axios from 'axios'
import './MoviesList.css'
import Banner from './Banner'

function MoviesList(){
    const [allMovies, setAllMovies] = useState()
    const [banner, setBanner] = useState()

  useEffect(  () => {
      const fect = async () =>{
        try{
            const res = await axios.get('/eb/home/movies')
            console.log(Math.floor( Math.random() * res.data[1].data.results.length-1))
            setBanner(res.data[1].data.results[Math.floor( Math.random() * res.data[1].data.results.length-1)])
        }catch(er){
           
        }
      }
      fect()
  },[allMovies])
  console.log(banner)

    return (
        <div className='movie__list'>
            <Banner moviePoster={banner} />
        </div>
    )
}

export default MoviesList