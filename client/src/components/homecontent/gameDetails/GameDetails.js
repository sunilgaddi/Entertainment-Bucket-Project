import "./GameDetails.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useEffect, useState } from "react"

function GameDetails() {
    const { video_id } = useParams()
    const [videoDetails, setVideoDetails] = useState('')
    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.post('/eb/gameDetails', { video_id })
                console.log(response.data, "from deta")
                setVideoDetails(response.data[0].items[0])
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchVideoDetails()
    }, [video_id])

    console.log(videoDetails, "hello")
    return (

        <div className='gamedetails___container'>
            <div className="gamedetails__upper__wrapper">
                <div className="gamedetails__poster" style={{ backgroundImage: `url(${videoDetails?.snippet?.thumbnails.high.url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} ></div>
                <div className="gamedetails">
                    <span className="published__on game__list">{videoDetails?.snippet?.publishedAt}</span>
                    <h3 className="game__name ">{videoDetails?.snippet?.channelTitle}</h3>
                    <span className="video__details">{videoDetails?.snippet?.localized.title}</span>
                    <span className="views__count game__list">Views {videoDetails?.statistics?.viewCount}</span>
                    <span className="likes__count game__list">Likes {videoDetails?.statistics?.likeCount}</span>
                </div>

            </div>
            <div className="gamedetails__des__wrapper">
                <h2 className="game__des__heading">Overview</h2>
                <p className="game__des">{videoDetails?.snippet?.description.substr(0,250)+"..."}</p>
            </div>
            <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${video_id}`} />
        </div>
    )
}

export default GameDetails