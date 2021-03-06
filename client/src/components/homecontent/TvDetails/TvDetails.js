import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import './TvDetails.css'
import timer from '../../../asserts/timer.png'
import MoviesRow from '../movieRows/MoviesRow'



function TvDetails() {
    const [tvData, setTvData] = useState('')
    const [tvSeasons,setTvSeasons] = useState('')
    const [tvGenres, setTvGenres] = useState('')
    const [tvProduction, setTvProduction] = useState('')
    const [tvCast,setTvCast] = useState('')
    const [tvCrew,setTvCrew] = useState('')
    const [tvVideoId,setTvVideoId] = useState('')
    const {id} = useParams()
    useEffect( () => {
        const fetchTv = async () => {
            const res = await axios.get(`
            https://api.themoviedb.org/3/tv/${id}?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
            setTvData(res.data)
            setTvSeasons(res.data.seasons)
            setTvGenres(res.data.genres)
            setTvProduction(res.data.production_companies)
            setTvVideoId(res.data.id)
        }
        fetchTv()
    },[])

    console.log(tvVideoId)

    useEffect( () => {
        if(tvData){
            const fetchTvCast = async () => {
                const tvCastnCrew = await axios.get(`https://api.themoviedb.org/3/tv/${tvData?.id}/credits?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
                setTvCast(tvCastnCrew.data.cast)
                setTvCrew(tvCastnCrew.data.crew)
            }
            fetchTvCast()
        }
    },[tvData])

    useEffect( () => {
        if(tvData){
            const fetchTvVideoId = async () => {
                const tvSeriesVideoId = await axios.get(`https://api.themoviedb.org/3/tv/${tvData?.id}/videos?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
                console.log(tvSeriesVideoId.data)
                setTvVideoId(tvSeriesVideoId.data.results[0].key)
            }
            fetchTvVideoId()
        }
    },[tvData])

    return (
        <div className="moviedetails__container">
            <div className='moviedetails__container__uppersection'>
                <div className='moviedetails__banner' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvData?.backdrop_path}")`, backgroundPosition: "center", backgroundSize: "cover" }}>
                </div>
                <div className='movie__poster-details__wrapper'>
                    <div className='moviedetails__poster' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${tvData?.poster_path}")`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                    <div className='moviedetails__wrapper'>
                        <span className='movie__year moviedetails__list' >{tvData?.first_air_date}</span>
                        <span className='movie__name moviedetails__list'>{tvData?.original_name}</span>
                        <span className='movie__duration moviedetails__list'><img className='timer' src={timer} alt='timer'/>{tvData?.episode_run_time}</span>
                        <span className='movie__rating__votes__wrapper'>
                            <span className='movie__rating moviedetails__list'>{tvData?.vote_average}</span>
                            <span className='movie__votes moviedetails__list'>{tvData?.vote_count}</span>
                        </span>
                        <span className='movie__dir__wrt__wrapper'>
                            <span className='movie__dir moviedetails__list'>Director Bruce</span>
                            <span className='movie__wrt moviedetails__list'>Written Wallberg</span>
                        </span>
                    </div>
                </div>
            </div>
            <MoviesRow data={tvSeasons} title={'Seasons'} mainPanel={'tv'} subPanel={'season'} tvSeries={tvData.original_name}/>
            <div style={{display:"flex", justifyContent:"center"}}>{tvVideoId && <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${tvVideoId}`} />}</div>
            <div className='moviedetails__container__middlesection'>
                <div className='moviedetails__desc__wrapper'>
                    <h3 className='moviedetails__desc__heading'>Over View</h3>
                    <p className='moviedetails__desc'>{tvData.overview}</p>
                </div>
                <div className='moviedetails__moredetails__wrapper'>
                    <div className='moredetails__leftbox'>
                        <span className='moredetails__heading movie__moredetails'>Language</span>
                        <span className='moredetails__heading movie__moredetails'>Popularity</span>
                        <span className='moredetails__heading movie__moredetails'>Genre</span>
                        <span className='moredetails__heading movie__moredetails'>Tagline</span>
                        <span className='moredetails__heading movie__moredetails'>Status</span>
                        <span className='moredetails__heading movie__moredetails'>Buget</span>
                        <span className='moredetails__heading movie__moredetails'>Revenue</span>
                        <span className='moredetails__heading movie__moredetails'>Production Company</span>
                    </div>
                    <div className='moredetails__rightbox'>
                        <span className='movie_lang movie__moredetails'>{tvData?.original_language}</span>
                        <span className='movie__popularity movie__moredetails'>{tvData?.popularity}</span>
                        {Array.from(tvGenres)?.map( (item ,id) => <span key={id} className='movie__genre movie__moredetails'>{item.name}</span>)}
                        <span className='movie__tagline movie__moredetails'>{tvData?.tagline}</span>
                        <span className='movie__status movie__moredetails'>{tvData?.status}</span>
                        <span className='movie__buget movie__moredetails'>{tvData?.budget}</span>
                        <span className='movie__revenue movie__moredetails'>{tvData?.revenue}</span>
                        {Array.from(tvProduction)?.map( (item, id) => <span key={id} className='movie__production movie__moredetails'>{item.name}</span>)}
                    </div>

                </div>
            </div>

            <div className='moviedetails__container__bottomsection'>
                <div className='movie__cast'>
                    <h3 className='movie__cast__heading movie__cc__heading'>Cast</h3>
                    <div className='movie__cast__profiles__wrapper'>
                    {Array.from(tvCast)?.map( (item, id) => {if(id < 15){ return <span key={id} className='movie__cast__profile__list'><span className='movie__cast__profile' style={{ backgroundImage: item.profile_path ? `url("https://image.tmdb.org/t/p/original${item?.profile_path}")`  : 'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")' , backgroundPosition: "center", backgroundSize: "cover" }}></span>{item.name}</span> }})}
                    </div>
                </div>
                <div className='movie__crew'>
                    <h3 className='movie__crew__heading movie__cc__heading'>Crew</h3>
                    <div className='movie__crew__profiles__wrapper'>
                    {Array.from(tvCrew)?.map( (item, id) => {if(id < 15){ return <span key={id} className='movie__cast__profile__list'><span className='movie__cast__profile' style={{ backgroundImage: item.profile_path ? `url("https://image.tmdb.org/t/p/original${item?.profile_path}")`  : 'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")', backgroundPosition: "center", backgroundSize: "cover" }}></span>{item.name}</span> }})}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TvDetails