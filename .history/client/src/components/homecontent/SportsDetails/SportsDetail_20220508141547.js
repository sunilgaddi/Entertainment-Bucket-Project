import './SportsDetail.css'
import axios from 'axios'
import { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'

function SportsDetails() {
    const {match_number, versus} = useParams()
    console.log(match_number,versus)

    const [matchWisePoster,setMatchWisePoster] = useState("")

    useEffect( () => {
        const fetchPosters = async () => {
            try{
                const response = await axios.get('/eb/ipl-api/matchwise-posters')
                response.data.map((item))
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchPosters()
    },[])
    console.log(matchWisePoster)
    return(
        <div className="sportsdetail__container">
            <div className='sportsdetail__banner'></div>
        </div>
    )
}
export default SportsDetails