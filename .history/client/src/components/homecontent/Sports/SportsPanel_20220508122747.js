import { useEffect,useState } from 'react'
import axios from 'axios'
import './SportsPanel.css'
import SnGbanner from '../Banner/SnGbanner'
import MovieRows from "../movieRows/MoviesRow"
const url = 'https://st1.latestly.com/wp-content/uploads/2022/01/IPL-2022.jpg'
function SportsPanel() {
    const [completedMatches,setCompletedMatches] = useState("")
    const [upcomingMatches,setUpcomingMatches] = useState("")

    useEffect( () => {
        const fetchCompletedMatches = async () => {
            try{
                const response = await axios.get('/eb/ipl-api/schedule-completed-matches')
                setCompletedMatches(response.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchCompletedMatches()
    },[])
    useEffect( () => {
        const fetchUpcomingMatches = async () => {
            try{
                const response = await axios.get('/eb/ipl-api/schedule-upcoming-matches')
                setUpcomingMatches(response.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchUpcomingMatches()
    },[])
    console.log(completedMatches)
    console.log(upcomingMatches)
    return(
        <div className='sports__container'>
            <SnGbanner url={url}/>
            <MovieRows data={completedMatches} title={'IPL 2022'} mainPanel={'sports'} />
            <MovieRows data={upcomingMatches} title={'IPL 2022'} mainPanel={'sports'} />
        </div>
    )
}

export default SportsPanel