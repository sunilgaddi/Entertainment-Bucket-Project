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
        if(matchDetails){
            const fetchTeamLogos = async () => {
                try {
                    const response = await axios.get('/eb/ipl-api/teams-meta-data')
                    response.data.map( (item) => {
                        if(matchDetails.team_one.team_name === item.team_name){
                            setTeamLogo1(item.team_poster)
                        }
                        if(matchDetails.team_two.team_name === item.team_name){
                            setTeamLogo2(item.team_poster)
                        }
                        
                    })
                }
                catch (err) {
                    console.log(err.message)
                }
            }
            fetchTeamLogos()
        }
    }, [matchDetails])
    console.log(teamLogo1,teamLogo2)
    return (
        <div className="sportsdetail__container">
            <div className='match__details__table'>
                <table cellPadding='20'>
                    <tbody>
                        <tr className='row-1 row'>
                            <td>{matchDetails?.match_number}</td>
                            <td></td>
                            <td>{matchDetails?.match_date}</td>
                        </tr>
                        <tr className='row-2 row'>
                            <td className='team_name_log'><img className="team__logo" src={`${teamLogo1}`}/> {matchDetails?.team_one?.team_name}</td>
                            <td></td>
                            <td>{matchDetails?.team_one?.team_score} {matchDetails?.team_one?.team_overs_played}</td>
                        </tr>
                        <tr className='row-3 row'>
                            <td className='team_name_log'><img className="team__logo" src={`${teamLogo2}`}/> {matchDetails?.team_two?.team_name}</td>
                            <td></td>
                            <td>{matchDetails?.team_two?.team_score} {matchDetails?.team_two?.team_overs_played}</td>
                        </tr>
                        <tr className='row-4 row'>
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