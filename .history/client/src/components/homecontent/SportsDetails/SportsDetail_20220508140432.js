import './SportsDetail.css'
import {useParams} from 'react-router-dom'

function SportsDetails() {
    const {match} = useParams()
    return(
        <div className="sportsdetail__container"></div>
    )
}
export default SportsDetails