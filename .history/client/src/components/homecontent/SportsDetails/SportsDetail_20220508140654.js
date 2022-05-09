import './SportsDetail.css'
import {useParams} from 'react-router-dom'

function SportsDetails() {
    const {match_number, versus} = useParams()
    console.log(match_number,versus)
    return(
        <div className="sportsdetail__container">
            <
        </div>
    )
}
export default SportsDetails