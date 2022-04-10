import { useState ,useEffect} from 'react'
import './Banner.css'

function Banner({moviePoster}) {

    return (
        <div className='banner__section' style={{ backgroundImage:`url("https://image.tmdb.org/t/p/original/${moviePoster?.backdrop_path}")`,backgroundPosition:'center',backgroundSize:"cover"}}>
            <div className='banner__content'>
                <div className='banner__top__content'>
                    <h1 className='movie__title'>{moviePoster?.name}</h1>
                    <ul className='movie__grtv__content movie__content__lists'>
                        <li className='movie__generis list'>Action</li>
                        <li className='movie__year list'>{moviePoster?.first_air_date.slice(0,4)}</li>
                        <li className='movie__lang list'>{moviePoster?.original_language}</li>
                        <li className='movie__popularity list'>{moviePoster?.vote_average}</li>
                    </ul>

                    <ul className='movie__starring__content movie__content__lists'>
                        <li className='starring__heading list'>Starring</li>
                        <li className='starring__one list'>Dave Bautista</li>
                        <li className='starring__two list'>ells</li>
                    </ul>
                </div>
                <div className='banner__bottom__content'>
                    <p className='movie__desc'>hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello</p>
                    <button>Watch Movie</button>
                </div>
            </div>
        </div>
    )
}

export default Banner