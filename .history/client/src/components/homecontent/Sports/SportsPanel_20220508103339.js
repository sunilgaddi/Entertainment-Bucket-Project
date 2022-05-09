import { useEffect,useState } from 'react'
import axios from 'axios'
import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
import MovieRows from "../movieRows/MoviesRow"
const url = 'https://st1.latestly.com/wp-content/uploads/2022/01/IPL-2022.jpg'
function SportsPanel() {
    const [matchWisePoster,setMatchWisePoster] = us

    useEffect( () => {
        const fetchPosters = async () => {
            try{
                const response = await axios.get('/eb/ipl-api/matchwise-posters')
                console.log(response.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchPosters()
    },[])
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
            
        </div>
    )
}

export default SportsPanel