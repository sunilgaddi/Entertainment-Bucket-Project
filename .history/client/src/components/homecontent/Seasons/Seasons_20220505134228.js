import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Seasons.css'

function Seasons(){
    //getting parameters
    const {id, season_id} = useParams()
    console.log(id, season_id)

    useEffect( () => {
        const fetchTvSeasons = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/tv/1402/season/1?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US')
            console.log(response)
        }
        fetchTvSeasons()
    },[])


    return(
        <div className="seasons__container">
            <div className='seasons__details__container'></div>
        </div>
    )
}

export default Seasons