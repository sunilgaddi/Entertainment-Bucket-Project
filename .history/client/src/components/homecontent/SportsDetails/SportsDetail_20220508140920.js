import './SportsDetail.css'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function SportsDetails() {
    const {match_number, versus} = useParams()
    console.log(match_number,versus)
    return(
        <div className="sportsdetail__container">
            <div className='sportsdetail__banner'></div>
        </div>
    )
}
export default SportsDetails