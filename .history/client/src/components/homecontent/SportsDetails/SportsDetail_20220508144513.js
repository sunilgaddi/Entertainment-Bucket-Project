import './SportsDetail.css'
import axios from 'axios'
import SnGbanner from "../Banner/SnGbanner"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SportsDetails() {
    const { match_number, versus } = useParams()
    console.log(match_number, versus)

    const [matchDetails, setMatchDetails] = useState("")

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get('/eb/ipl-api/schedule')
                console.log(response.data)
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
        fetchPosters()
    }, [])
    console.log(matchDetails)
    return (
        <div className="sportsdetail__container">
            <div className='match__details__table'>
                <table>
                    <tbody>
                        <tr>
                            <td>{}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
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