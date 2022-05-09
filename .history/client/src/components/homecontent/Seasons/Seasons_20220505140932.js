import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Seasons.css'

function Seasons(){
    //getting parameters
    const {id, season_id} = useParams()
    console.log(id, season_id)
 
    const [season,setSeason] = useState('')

    useEffect( () => {
        const fetchTvSeasons = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/tv/1402/season/1?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US')
            console.log(response)
            setSeason(response.data)
        }
        fetchTvSeasons()
    },[])


    return(
        <div className="seasons__container">
            <div className='seasons__upper__container'>
                <div className='seasons__poster' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${season?.poster_path}")`, backgroundPosition:'center' , backgroundSize}}></div>
                <div className='seasons__details'>
                    <li className='seasons__year list'>2015</li>
                    <li className='series__name list'>black man</li>
                    <li  className='seasons__number list'>season 1</li>
                </div>
            </div>

            <div className='seasons__middle__container'>
                <div className='seasons__overview__wrapper'>
                    <h3 className='seasons__overview__heading'>Overview.</h3>
                    <p className='seasons__overview'></p>
                </div>
            </div>
        </div>
    )
}

export default Seasons