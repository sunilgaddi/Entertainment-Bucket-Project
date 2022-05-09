import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'
import timer from '../../../asserts/timer.png'


function MovieDetails() {
    const [movieData, setMovieData] = useState('')
    const [movieGenres, setMovieGenres] = useState('')
    const [movieProduction, setMovieProduction] = useState('')
    const [movieCast,setMovieCast] = useState('')
    const [movieCrew,setMovieCrew] = useState('')
    const {id} = useParams()
    useEffect( () => {
        const fetchMovie = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
            setMovieData(res.data)
            setMovieGenres(res.data.genres)
            setMovieProduction(res.data.production_companies)
        }
        fetchMovie()
    },[])

    useEffect( () => {
        if(movieData){
            const fetchMovieCast = async () => {
                const movieCastnCrew = await axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=d8e917f824c891e475632f1dfa0de591&language=en-US`)
                setMovieCast(movieCastnCrew.data.cast)
                setMovieCrew(movieCastnCrew.data.crew)
            }
            fetchMovieCast()
        }
    },[movieData])
    return (
        <div className="moviedetails__container">
            <div className='moviedetails__container__uppersection'>
                <div className='moviedetails__banner' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}")`, backgroundPosition: "center", backgroundSize: "cover" }}>
                </div>
                <div className='movie__poster-details__wrapper'>
                    <div className='moviedetails__poster' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieData?.poster_path}")`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                    <div className='moviedetails__wrapper'>
                        <span className='movie__year moviedetails__list' >{movieData?.release_date}</span>
                        <span className='movie__name moviedetails__list'>{movieData?.original_title}</span>
                        <span className='movie__duration moviedetails__list'><img className='timer' src={timer} alt='timer'/>{movieData?.runtime}</span>
                        <span className='movie__rating__votes__wrapper'>
                            <span className='movie__rating moviedetails__list'>{movieData?.vote_average}</span>
                            <span className='movie__votes moviedetails__list'>{movieData?.vote_count}</span>
                        </span>
                        <span className='movie__dir__wrt__wrapper'>
                            <span className='movie__dir moviedetails__list'>Director Bruce</span>
                            <span className='movie__wrt moviedetails__list'>Written Wallberg</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='moviedetails__container__middlesection'>
                <div className='moviedetails__desc__wrapper'>
                    <h3 className='moviedetails__desc__heading'>Over View</h3>
                    <p className='moviedetails__desc'>{movieData.overview}</p>
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
                        <span className='movie_lang movie__moredetails'>{movieData?.original_language}</span>
                        <span className='movie__popularity movie__moredetails'>{movieData?.popularity}</span>
                        {Array.from(movieGenres)?.map( (item ,id) => <span key={id} className='movie__genre movie__moredetails'>{item.name}</span>)}
                        <span className='movie__tagline movie__moredetails'>{movieData?.tagline}</span>
                        <span className='movie__status movie__moredetails'>{movieData?.status}</span>
                        <span className='movie__buget movie__moredetails'>{movieData?.budget}</span>
                        <span className='movie__revenue movie__moredetails'>{movieData?.revenue}</span>
                        {Array.from(movieProduction)?.map( (item, id) => <span key={id} className='movie__production movie__moredetails'>{item.name}</span>)}
                    </div>

                </div>
            </div>

            <div className='moviedetails__container__bottomsection'>
                <div className='movie__cast'>
                    <h3 className='movie__cast__heading movie__cc__heading'>Cast</h3>
                    <div className='movie__cast__profiles__wrapper'>
                    {Array.from(movieCast)?.map( (item, id) => {if(id < 15){ return <span key={id} className='movie__cast__profile__list'><span className='movie__cast__profile' style={{ backgroundImage: item.profile_path ? `url("https://image.tmdb.org/t/p/original${item?.profile_path}")`  : 'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")' , backgroundPosition: "center", backgroundSize: "cover" }}></span>{item.name}</span> }})}
                    </div>
                </div>
                <div className='movie__crew'>
                    <h3 className='movie__crew__heading movie__cc__heading'>Crew</h3>
                    <div className='movie__crew__profiles__wrapper'>
                    {Array.from(movieCrew)?.map( (item, id) => {if(id < 15){ return <span key={id} className='movie__cast__profile__list'><span className='movie__cast__profile' style={{ backgroundImage: item.profile_path ? `url("https://image.tmdb.org/t/p/original${item?.profile_path}")`  : 'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")', backgroundPosition: "center", backgroundSize: "cover" }}></span>{item.name}</span> }})}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieDetails