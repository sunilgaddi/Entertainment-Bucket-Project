import './SportsDetail.css'
import axios from 'axios'
import SnGbanner from "../Banner/SnGbanner"
import { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'

function SportsDetails() {
    const {match_number, versus} = useParams()
    console.log(match_number,versus)

    const [matchPoster,setMatchPoster] = useState("")

    useEffect( () => {
        const fetchPosters = async () => {
            try{
                const response = await axios.get('/eb/ipl-api/matchwise-posters')
                response.data.filter((item) => {
                    if(item.match_number === match_number){
                        return setMatchPoster(item)
                    }
                })
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchPosters()
    },[])
    console.log(matchPoster.banner)
    return(
        <div className="sportsdetail__container">
            <SnGbanner url={matchPoster.banner}/>
        </div>
    )
}
export default SportsDetails