import './SportsDetail.css'
import axios from 'axios'
import ScoreCard from '../ScoreCard.js/ScoreCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SportsDetails() {
    const { id, match_number, versus } = useParams()
    console.log(match_number, versus)

    const [matchDetails, setMatchDetails] = useState("")
    const [teamLogo1, setTeamLogo1] = useState("")
    const [teamLogo2, setTeamLogo2] = useState("")
    const [matchSnR, setMatchSnR] = useState("")
    const [t1FullScore, setT1FullScore] = useState("")
    const [t2FullScore, setT2FullScore] = useState("")

    const alignCenter = {
        textAlign: "center"
    }

    const alignRight = {
        textAlign: "right"
    }

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get('/eb/ipl-api/schedule')
                setMatchDetails(response.data[id])
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchMatchDetails()
    }, [])

    useEffect(() => {
        if (matchDetails) {
            const fetchTeamLogos = async () => {
                try {
                    const response = await axios.get('/eb/ipl-api/teams-meta-data')
                    response.data.map((item) => {
                        if (matchDetails.team_one.team_name === item.team_name) {
                            setTeamLogo1(item.team_poster)
                        }
                        if (matchDetails.team_two.team_name === item.team_name) {
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


    useEffect(() => {
        if (matchDetails?.full_results) {
            const { full_results } = matchDetails
            const fetchMatchScores = async () => {
                try {
                    const response = await axios.post("/eb/ipl-api/match-score", { full_results })

                    setMatchSnR(response.data[2])
                    setT1FullScore(response.data[0])
                    setT2FullScore(response.data[1])
                }
                catch (err) {
                    console.log(err)
                }
            }
            fetchMatchScores()
        }
    }, [matchDetails])

    console.log(matchDetails)

    return (
        <div className="sportsdetail__container">
            <div className='match__details__table'>
                <table className="short__score__board" cellSpacing={10} >
                    <tbody>
                        <tr className='row-1 row'>
                            <td className='match__number__date'>{matchDetails?.match_number}</td>
                            <td style={alignRight} className='match__number__date'>{matchDetails?.match_date},<span style={{ marginLeft: "10px" }}>{matchDetails?.match_time}</span></td>
                        </tr>
                        <tr>
                            <td className='srv__info' style={alignCenter} colSpan={"3"}>{matchSnR?.match_status}</td>
                        </tr>
                        <tr className='row-2 row'>
                            <td className='team__name__log team__name__score '><img className="team__logo" src={`${teamLogo1}`} /> {matchDetails?.team_one?.team_name}</td>
                            <td style={alignRight} className='team__name__score'>{matchDetails?.team_one?.team_score} {matchDetails?.team_one?.team_overs_played}</td>
                        </tr>
                        <tr className='row-3 row'>
                            <td className='team__name__log team__name__score'><img className="team__logo" src={`${teamLogo2}`} /> {matchDetails?.team_two?.team_name}</td>
                            <td style={alignRight} className='team__name__score'>{matchDetails?.team_two?.team_score} {matchDetails?.team_two?.team_overs_played}</td>
                        </tr>
                        <tr>
                            <td className='srv__info' style={alignCenter} colSpan={"3"} >{matchSnR?.match_results_status}</td>
                        </tr>
                        <tr className='row-4 row'>
                            <td className='srv__info' colSpan={3}>{matchDetails?.venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {matchDetails?.full_results &&
                <div className='fs__wrapper'>
                    <ScoreCard data={t1FullScore} />
                    <ScoreCard data={t2FullScore} />
                </div>
            }
        </div>
    )
}
export default SportsDetails