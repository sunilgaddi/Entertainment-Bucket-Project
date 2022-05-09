import './SportsDetail.css'
import axios from 'axios'
import SnGbanner from "../Banner/SnGbanner"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SportsDetails() {
    const { match_number, versus } = useParams()
    console.log(match_number, versus)

    const [matchDetails, setMatchDetails] = useState("")
    const [teamLogo1, setTeamLogo1] = useState("")
    const [teamLogo2, setTeamLogo2] = useState("")

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get('/eb/ipl-api/schedule')
                response.data.filter((item) => {
                    if (item.match_number === match_number) {
                        return setMatchDetails(item)
                    }
                })
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchMatchDetails()
    }, [])

    useEffect(() => {
        const fetchTeamLogos = async () => {
            try {
                const response = await axios.get('/eb/ipl-api/teams-meta-data')
                response.data.map( (item) => {
                    if(matchDetails.team_one.team_name === item.team_name){
                        setTeamLogo1(item.team_poste)
                    }
                })
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchTeamLogos()
    }, [])
    console.log(matchDetails)
    return (
        <div className="sportsdetail__container">
            <div className='match__details__table'>
                <table>
                    <tbody>
                        <tr>
                            <td>{matchDetails?.match_number}</td>
                            <td></td>
                            <td>{matchDetails?.match_date}</td>
                        </tr>
                        <tr>
                            <td>{teamLogos} {matchDetails?.team_one?.team_name}</td>
                            <td></td>
                            <td>{matchDetails?.team_one?.team_score} {matchDetails?.team_one?.team_overs_played}</td>
                        </tr>
                        <tr>
                            <td>{matchDetails?.team_two?.team_name}</td>
                            <td></td>
                            <td>{matchDetails?.team_two?.team_score} {matchDetails?.team_two?.team_overs_played}</td>
                        </tr>
                        <tr>
                            <td>{matchDetails?.venue}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default SportsDetails